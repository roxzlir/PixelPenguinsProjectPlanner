import React from "react";
import AddWorkedHours from "../components/AddWorkedHours";
import TimeReportAddComfirmation from "../components/TimeReportAddComfirmation";

export default function ReportTime() {
    return (
      <div>
        <h1>Report Time</h1>
        <p>Prova skriva till databasens fält här</p>
        {/* <AddWorkedHours /> */}
        <TimeReportAddComfirmation/>
      </div>
    );
}
