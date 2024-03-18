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
  // Funktion för att jämföra dagens datum med slutdatum för varje projekt   DATUM
  const compareTime = () => {
    if (data && Array.isArray(data.results)) {
      return data.results.map((project) => {
        // Beräkna skillnaden i dagar mellan slutdatum och dagens datum
        const endDate = new Date(project.properties.Timespan.date.end);
        const timeDifference = endDate.getTime() - todayDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        // Hämta projektets namn och slutdatum
        const projectName =
          project.properties.Projectname.title[0].text.content;
        const endDateEnd = project.properties.Timespan.date.end;


        if (endDate < todayDate) {
          // Om slutdatumet har passerat
          return (
            <li key={project.id}>
              Project ID: {project.id} <br />
              Project name: {projectName} <br />
              End-Date for {projectName} project: {""} is :{""} {endDateEnd}
              <div key={project.id} style={{ backgroundColor: "red" }}>
                !!! End-Date have passed!!! <br />
              </div>
              <br />
            </li>
          );
        } else {
          // Annars Om det återstår dagar innan slutdatumet
          return (
            <li key={project.id}>
              Project ID: {project.id} <br />
              Project name: {projectName} <br />
              End-Date for {projectName} project is: {""}
              {""} {endDateEnd}
              <div style={{ backgroundColor: "Green" }}>
                The Project has {daysDifference} days left before ending.
              </div>{" "}
              <br />
              <br />
            </li>
          );
        }
      });
    }
  };


  /// ********************************************************************************
  // Funktion med olika bakgrundsfärg beroende på status  TIMMAR
  const hoursLeft = () => {
    if (data && Array.isArray(data.results)) {
      return data.results.map((hours) => {
        // Extrahera data för timmar, arbetade timmar och kvarvarande timmar
        const totalHours = hours.properties.Hours.number;
        const workedHours = hours.properties["Worked hours"].rollup.number;
        const hoursLeft = hours.properties["Hours left"].formula.number;
        const projectName = hours.properties.Projectname.title[0].text.content;

        // Extrahera projektstatus och definiera stil baserat på det
        const activeProject = hours.properties.Status.select.name;
        let style = {}; // Deklarera stylevariabeln

        // Bakgrundsfärg beroende på projekttsstatus
        if (activeProject === "Active") {
          style = { backgroundColor: "green" }; // Aktiv
        } else if (activeProject === "Next up") {
          style = { backgroundColor: "yellow" }; // Nästa
        } else if (activeProject === "Done") {
          style = { backgroundColor: "red" }; // Klart
        }

        if (totalHours && workedHours) {
          // Om timmar och arbetade timmar finns
          const remainingHours = totalHours - workedHours;
          return (
            <li key={hours.id}>
              Project name: {projectName} <br />
              <div style={style}>active? : {activeProject} </div>
              Hours left: {hoursLeft} <br />
              Worked hours: {workedHours} <br />
              Hours: {totalHours} <br />
              <br /> <br /> <br /> <br />
            </li>
          );
        } else {
          // Annars timmar eller arbetade timmar INTE finns
          return (
            <li key={hours.id}>
              Project name: {projectName} <br />
              <div style={style}>active? : {activeProject} </div>
              Hours left: {hoursLeft} <br />
              <div style={{ backgroundColor: "orange" }}>
                {" "}
                Worked hours: {workedHours}
              </div>
              Hours: {totalHours} <br />
              <br /> <br /> <br /> <br />
            </li>
          );
        }
      });
    }
  };


  

// **************************************************************************************

// OM HOURS LEFT = 0 ELLER -        ALERT!!!




  // jämför min js data
  if (!data || !Array.isArray(data?.results)) {
    // Om data inte finns eller inte är en array
    return <p>Laddar data / ingen data att visa...</p>;
  }

  // Om data finns
  return (
    <div style={{ textAlign: "left" }}>
      <h1>Jämför datan för tidsspannen för projekten</h1>
      <h2>
        Jämför slutdatum mot dagens datum: <br></br> {todayDate.toDateString()}{" "}
        {/**dagens datum */}
      </h2>
      <div className="AlertContainer">
        <h3>compareTime</h3>
        <ul>
          {/* compareTime(), enskilt projekt DATUM*/}
          {compareTime()}
        </ul>
      </div>
      <h3>HoursLeft - Jämför Timmar loggade i ett project</h3>
      <div>
        {/* HoursLeft(), enskilt projekt TIMMAR*/}
        <ul>{hoursLeft()}</ul>
      </div>
    </div>
  );
}
