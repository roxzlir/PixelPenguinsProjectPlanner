import React from "react";
import AddTimereport from "../components/AddTimereport";

export default function ReportTime() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Report Time</h1>
            <p></p>
            {loginProcess && <AddTimereport />}
        </div>
    );
}
