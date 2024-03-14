import React from "react";
import AddTimereport from "../components/AddTimereport";
import PresentUser from "../components/PresentUser";

export default function ReportTime() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Report Time</h1>
            <p></p>
            {loginProcess && <AddTimereport />}
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
