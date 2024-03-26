import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AlertCompareEndDate({ onSelectProject }) {
  // State för att lagra data och dagens datum
  const [data, setData] = useState(null);
  const [todayDate, setTodayDate] = useState(new Date()); // Dagens datum

  // Hämta data från backend när komponenten monteras
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/api/notion");
        setData(response.data); // Sätt den hämtade datan i state
        console.log("Datan vi hämtar från Notion: ", response.data);
      } catch (error) {
        console.log("Fel inträffade vid hämtningen från Notion: ", error);
      }
    };

    fetchData(); // Anropa funktionen för att hämta data
  }, []); // Använd en tom beroende-array för att köra useEffect en gång när komponenten monteras

  /// ********************************************************************************
  // Funktion för att jämföra dagens datum med slutdatum för varje projekt
  // Sorterar efter status och sätter bakgrunsfärg efter detta
  // LISAR ALLA OCH DISPLAYAR ALLA
  /// ********************************************************************************
  const compareTime = () => {
    if (data && Array.isArray(data.results)) {
      // Filtrera projekt baserat på status
      const activeProjects = data.results.filter(
        (project) => project.properties.Status.select.name === "Active"
      );
      const nextUpProjects = data.results.filter(
        (project) => project.properties.Status.select.name === "Next up"
      );
      const doneProjects = data.results.filter(
        (project) => project.properties.Status.select.name === "Done"
      );

      // Sortera projekten i ordning och rendera dem
      return (
        <div>
          <h2>Active Projects:</h2>
          <ul>{sortProjects(activeProjects, "green")}</ul>
          <h2>Next Up Projects:</h2>
          <ul>{sortProjects(nextUpProjects, "orange")}</ul>
          <h2>Done Projects:</h2>
          <ul>{sortProjects(doneProjects, "red")}</ul>
        </div>
      );
    }
  };
  // HÖR IHOP!!  Funktion för att sortera bort - dagar kvar till end Date!!
  const sortProjects = (projects, color) => {
    return projects.map((project) => {
      const endDate = new Date(project.properties.Timespan.date.end);
      const projectName = project.properties.Projectname.title[0].text.content;
      const timeDifference = endDate.getTime() - todayDate.getTime();
      let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      // Skapa meddelande baserat på antalet dagar kvar
      let daysLeftMessage = ""; // Meddelande om antal dagar kvar innan avslut

      if (daysDifference <= 0) {
        daysLeftMessage = "Project has ended.";
      } else {
        daysLeftMessage = `The Project has ${daysDifference} days left before ending.`;
      }

      // Kontrollera om projektet har avslutats
      // men fortfarande är markerat som "Active" eller "Next up"
      // aktiverar varningstext
      let activeWarning = "";
      if (
        daysDifference <= 0 &&
        (project.properties.Status.select.name === "Active" ||
          project.properties.Status.select.name === "Next up")
      ) {
        activeWarning = `WARNING: Project has ended but still marked as ${project.properties.Status.select.name}.`;
      }

      return (
        <ul key={project.id}>
          <h3>Project name: {projectName}</h3>
          End-Date for {projectName} project is: {endDate.toDateString()}
          <div style={{ backgroundColor: color }}>
            {daysLeftMessage}
            {activeWarning && <p style={{ color: "red" }}>{activeWarning}</p>}
          </div>
        </ul>
      );
    });
  };

  /// ********************************************************************************
  // Funktion med olika bakgrundsfärg beroende på status  TIMMAR
  //    OM ACTIVE , NEXT UP, DONE ?
  /// ********************************************************************************
  const hoursLeft = () => {
    if (data && Array.isArray(data.results)) {
      return data.results.map((hours) => {
        // hämta data för timmar, arbetade timmar och kvarvarande timmar
        const totalHours = hours.properties.Hours.number;
        const workedHours = hours.properties["Worked hours"].rollup.number;
        const hoursLeft = hours.properties["Hours left"].formula.number;
        const projectName = hours.properties.Projectname.title[0].text.content;

        // hämta projektstatus och definiera stil baserat på det
        const activeProject = hours.properties.Status.select.name;
        let style = {}; // Deklarera stylevariabeln

        // Bakgrundsfärg beroende på status
        if (activeProject === "Active") {
          style = { backgroundColor: "green" }; // Aktiv
        } else if (activeProject === "Next up") {
          style = { backgroundColor: "orange" }; // Nästa
        } else if (activeProject === "Done") {
          style = { backgroundColor: "red" }; // Klart
        }

        // Kontrollera om status är "Active" eller "Next up" och hours left är mindre än 0
        if (
          (activeProject === "Active" || activeProject === "Next up") &&
          hoursLeft < 0
        ) {
          return (
            <ul key={hours.id}>
              <h3>Project name: {projectName}</h3>
              <div style={style}>Status: {activeProject} </div>
              <div style={{ color: "red" }}>
                WARNING: Hours left is less than 0 but till active / Next up
                {/* varning */}
              </div>
              Hours left: {hoursLeft} <br />
              Worked hours: {workedHours} <br />
              Hours: {totalHours} <br />
              <br /> <br /> <br /> <br />
            </ul>
          );
        } else {
          // Om timmar och arbetade timmar finns
          return (
            <ul key={hours.id}>
              <h3>Project name: {projectName}</h3>
              <div style={style}>Status: {activeProject} </div>
              Hours left: {hoursLeft} <br />
              Worked hours: {workedHours} <br />
              Hours: {totalHours} <br />
              <br /> <br /> <br /> <br />
            </ul>
          );
        }
      });
    }
  };

  if (!data || !Array.isArray(data?.results)) {
    // Om data inte finns eller inte är en array
    return <p>Laddar data / ingen data att visa...</p>;
  }

  // Om data finns
  return (
    <div style={{ textAlign: "left" }}>
      <h1>COMPARE DIFFERNT DATA</h1>
      <h2>
        CompareTime - Compare EndDate against TODAY DATE: <br></br>{" "}
        {todayDate.toDateString()} {/**dagens datum */}
      </h2>
      <br />
      <div className="AlertContainer">
        <h2>compareTime - How many days left until endate</h2>
        <p>All Projects Active, Next up, Done</p>
        <ul>{compareTime()}</ul>
      </div>
      <br />
      <h3>HoursLeft - Jämför Timmar loggade i ett project</h3>
      <div>
        {/* HoursLeft(), enskilt projekt TIMMAR  GULT ORANGE GRÖNT*/}
        <ul>{hoursLeft()}</ul>
      </div>
      <br />
    </div>
  );
}
