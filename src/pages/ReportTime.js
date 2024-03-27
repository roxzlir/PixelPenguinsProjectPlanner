import React from "react";
import LogTimereport from "../components/LogTimereport";
import LoggedInTimereports from "../components/LoggedInTimereports";
import "../css/ReportTime.css";

export default function ReportTime() {
    return (
        <div className="ReportTime-container">
            <LogTimereport />
            <LoggedInTimereports />
        </div>
    );
}
