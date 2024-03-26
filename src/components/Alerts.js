import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Alert({ onSelectProject }) {
  const [data, setData] = useState(null);
  const [todayDate] = useState(new Date()); // Dagens datum
  const [alertResults, setAlertResults] = useState([]); // State för att lagra varningsresultat
  const alertDataRef = useRef([]);

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

  //**************************************************************************************************************
  //******************* Next up project (ej activa än) Om det är mindre än 10 dagar kvar till startUP *******************************************
  //**************************************************************************************************************

  const alertDaysUntilStart = () => {
    if (!data || !Array.isArray(data.results)) return null;

    const alerts = data.results.map((alertData) => {
      const endDateEnd = alertData.properties.Timespan.date.end;
      const startDate = new Date(alertData.properties.Timespan.date.start);
      const startDateDifference = startDate.getTime() - todayDate.getTime();
      const daysToStart = Math.ceil(startDateDifference / (1000 * 3600 * 24));
      const projectName =
        alertData.properties.Projectname.title[0].text.content;
      const activeProject = alertData.properties.Status.select.name;
      const startDateDate = alertData.properties.Timespan.date.start;

      //om next up och vilkor stämmer
      if (activeProject === "Next up" && daysToStart >= 0 && daysToStart < 10) {
        // Lägg till data i ref-objektet
        alertDataRef.current.push({
          type: "alertDaysUntilStart",
          projectName: projectName,
          daysToStart: daysToStart,
          startDate: startDateDate,
          endDate: endDateEnd,
        });

        return (
          <ul key={alertData.id}>
            <br />
            <h3 style={{ color: "red" }}>
              WARNING!
              <br /> Less than 10 days to startup
            </h3>
            <h2>
              Project name: {projectName} <br />
            </h2>
            Days until start : {daysToStart} <br />
            Start date project : {startDateDate} <br />
            End date project : {endDateEnd} <br />
          </ul>
        );
      }
      return null;
    });

    setAlertResults(alerts); // Uppdatera state med varningsresultat
  };

  //**************************************************************************************************************
  // Funktion för att kontrollera varningar baserat på timmar kvar
  // mindre än 10 h kvar på projekt
  //**************************************************************************************************************
  const alertHours = () => {
    if (!data || !Array.isArray(data.results)) return null;

    const alerts = data.results.map((alertData) => {
      const endDate = new Date(alertData.properties.Timespan.date.end);
      const hoursLeft = alertData.properties["Hours left"].formula.number;
      const projectName =
        alertData.properties.Projectname.title[0].text.content;
      const activeProject = alertData.properties.Status.select.name;
      const startDateDate = new Date(alertData.properties.Timespan.date.start);

      // om det enda eller andra vilkoret stämmer
      if (
        (activeProject === "Active" && hoursLeft >= 0 && hoursLeft <= 10) ||
        (activeProject === "Next up" && hoursLeft >= 0 && hoursLeft <= 10)
      ) {
        return (
          <ul key={alertData.id}>
            <br />
            <h3 style={{ color: "red" }}>
              WARNING!
              <br /> Less than 10 hours left in project
            </h3>
            ********************* <br />
            <h2>
              Project name: {projectName} <br />
            </h2>
            Active? : {activeProject} <br />
            Hours left: {hoursLeft} <br />
            Start date: {startDateDate.toDateString()} <br />
            End date: {endDate.toDateString()} <br />
            ********************* <br />
          </ul>
        );
      }

      return null; // Return null för det som inte möter vilkoren
    });

    setAlertResults(alerts); // Uppdatera state med varningsresultat
  };

  // **************************************************************************************
  // OM DET ÄR MER Hours left i förhållande sätt till end date i timmar..
  // **************************************************************************************
  const alertHoursDays = () => {
    if (!data || !Array.isArray(data.results)) return null;

    let alerts = []; // Definiera alerts

    alerts = data.results.map((alertData) => {
      const endDate = new Date(alertData.properties.Timespan.date.end);
      const daysLeft = Math.ceil((endDate - todayDate) / (1000 * 3600 * 24)); // Days left until endDate

      // är endDate efter dagens datum?
      if (endDate < todayDate) return null;

      const projectName =
        alertData.properties.Projectname.title[0].text.content;
      const activeProject = alertData.properties.Status.select.name;
      const hoursLeft = alertData.properties["Hours left"].formula.number;
      const workHoursPerDay = 8; // 8 h / arbetsdag

      const neededWorkDays = hoursLeft / workHoursPerDay; // räklna ut behövda arbetsdagar

      //om vilkor stämmer
      if (activeProject === "Active" && daysLeft < neededWorkDays) {
        return (
          <ul key={alertData.id}>
            <br />
            <h3 style={{ color: "red" }}>
              WARNING! <br /> This project is {activeProject} and has more hours
              left than workdays until endDate:
            </h3>
            <h2>
              Project name: {projectName} <br />
            </h2>
            Days left until endDate: {daysLeft} <br />
            Needed work days: {neededWorkDays} <br />
            Hours left: {hoursLeft} <br /> <br />
            Todays date: {todayDate.toDateString()} <br />
            End date project: {endDate.toDateString()} <br />
            ------------------------------------------
            <p>Make the changes needed</p>
          </ul>
        );
      }

      return null; // Retur null för det som inte möter vilkoren
    });

    setAlertResults(alerts); // Uppdatera state med varningsresultat
  };

  // **************************************************************************************
  // om det är mindre än 48 h kvar till end date
  // **************************************************************************************
  const alertTwoDayEnd = () => {
    if (!data || !Array.isArray(data.results)) return null;

    let alerts = []; // Definiera alerts

    data.results.forEach((alertData) => {
      const endDate = new Date(alertData.properties.Timespan.date.end);
      const daysLeft = Math.ceil((endDate - todayDate) / (1000 * 3600 * 24)); // dagar till endDate

      // kolla om enddate är i framtiden, retur null
      if (endDate < todayDate) return null;

      const projectName =
        alertData.properties.Projectname.title[0].text.content;
      const activeProject = alertData.properties.Status.select.name;

      // om vilkor stämmer
      if (activeProject === "Active" && daysLeft < 2) {
        alerts.push(
          <ul key={alertData.id}>
            <br />
            <h3 style={{ color: "red" }}>
              WARNING! <br /> This project is {activeProject} and has less than
              48 hours to endDate:
            </h3>
            <h2>
              Project name: {projectName} <br />
            </h2>
            Todays date: {todayDate.toDateString()} <br />
            Days left until endDate: {daysLeft} <br />
            End date for this project: {endDate.toDateString()} <br />
            ------------------------------------------
            <p>Make the changes needed</p>
          </ul>
        );
      }
    });

    setAlertResults(alerts); // Uppdatera state med varningsresultat
  };

  // **************************************************************************************
  // OM END DATE PASSERAT
  // **************************************************************************************
  const alertEndDate = () => {
    if (!data || !Array.isArray(data.results)) return null;

    let alerts = []; // Definiera 'alerts' här

    data.results.forEach((alertData) => {
      const projectName =
        alertData.properties.Projectname.title[0].text.content;
      const activeProject = alertData.properties.Status.select.name;
      const endDate = new Date(alertData.properties.Timespan.date.end);

      // räkna skillnaden mellan endDate och dagens datum i millisekunder
      let passedDays = endDate.getTime() - todayDate.getTime();

      // Konvertera passedDays från milliseconds till dagar
      passedDays = Math.ceil(passedDays / (1000 * 3600 * 24));

      // är enddate före dagens datum?
      if (endDate > todayDate) return null;

      if (activeProject === "Active") {
        alerts.push(
          <ul key={alertData.id}>
            <br />
            <h3 style={{ color: "red" }}>
              WARNING! <br /> This project is {activeProject}, endDate has
              PASSED:
            </h3>
            <h2>
              Project name: {projectName} <br />
            </h2>
            Todays date: {todayDate.toDateString()} <br />
            End date: {endDate.toDateString()} <br />
            Passes in {passedDays} days
            <br />
            ------------------------------------------
          </ul>
        );
      }
    });

    setAlertResults(alerts); // Uppdatera state med varningsresultat

    // Returnera hasDataToShow
  };

  //**************************************************************************************************************
  // Till Knapp för att starta varningskontrollen för antal dagar kvar till start
  //**************************************************************************************************************
  const checkDaysButtonColor = alertResults.length > 0 ? "default" : "red";

  //**************************************************************************************************************
  // Till Knapp för att starta varningskontrollen för antal timmar kvar
  //**************************************************************************************************************
  const checkHoursButtonColor = alertResults.length > 0 ? "default" : "red";

  //**************************************************************************************************************
  // Till Knapp för att starta varningskontrollen
  // OM DET ÄR MER Hours left i förhållande sätt till end date i timmar..
  //**************************************************************************************************************
  const checkAlertHoursButtonColor =
    alertResults.length > 0 ? "default" : "red";

  //**************************************************************************************************************
  // Till Knapp för att starta varningskontrollen
  // OM om det är mindre än 48 h kvar till end date..
  //**************************************************************************************************************
  const checkAlertTwodayEndButtonColor =
    alertResults.length > 0 ? "default" : "red";

  //**************************************************************************************************************
  // Till Knapp för att starta varningskontrollen
  // OM OM END DATE PASSERAT..
  //**************************************************************************************************************
  const checkAlertEndDateButtonColor =
    alertResults.length > 0 ? "default" : "red";

  return (
    <div style={{ textAlign: "left" }}>
      <h1>WARNINGS DATA PROJECTS</h1>
      <h2>
        TODAY DATE: {todayDate.toDateString()} {/**dagens datum */}
      </h2>

      {/* Knapp för att starta varningskontrollen för antal dagar kvar 
      10 Dagar till startup Next up project (ej activa än) */}
      <button
        onMouseEnter={alertDaysUntilStart}
        onMouseDown={() => setAlertResults([])}
        style={{ backgroundColor: checkDaysButtonColor }}
      >
        Check Projects (10 Days to StartUp)
      </button>

      {/* Knapp för att starta varningskontrollen för mindre än 10 h kvar på Active projekt*/}
      <button
        onMouseEnter={alertHours}
        onMouseDown={() => setAlertResults([])}
        style={{ backgroundColor: checkHoursButtonColor }}
      >
        Check Projects (Less then 10 Hours in project)
      </button>

      {/* Knapp för att starta varningskontrollen
    OM DET ÄR MER Hours left i förhållande sätt till end date i timmar.. */}
      <button
        onMouseEnter={alertHoursDays}
        onMouseDown={() => setAlertResults([])}
        style={{ backgroundColor: checkAlertHoursButtonColor }}
      >
        Check Projects (Active Date & Time)
      </button>

      {/* Knapp för att starta varningskontrollen OM om det är 
    mindre än 48 h kvar till end date.. */}
      <button
        onMouseEnter={alertTwoDayEnd}
        onMouseDown={() => setAlertResults([])}
        style={{ backgroundColor: checkAlertTwodayEndButtonColor }}
      >
        Check Projects (Less than 48h EndDate)
      </button>

      {/* Knapp för att starta varningskontrollen OM OM END DATE PASSERAT. */}

      <button
        onMouseEnter={alertEndDate}
        onMouseDown={() => setAlertResults([])} // Återställ alertResults när musen lämnar knappen
        style={{ backgroundColor: checkAlertEndDateButtonColor }}
      >
        Check Projects (ACTIVE & EndDate has PASSED!!)
      </button>

      {/* Rendera varningsresultat */}
      {alertResults}
    </div>
  );
}
