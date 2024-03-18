import React, { useState, useEffect } from "react";
import PresentUser from "../components/PresentUser";
import UserVisualize from "../components/UserVisualize";

export default function Employees() {
    const loginProcess = localStorage.getItem("loggedInUser");
    const loggedRole = localStorage.getItem("userRole");
    loggedRole.toString();
    const teamLeader = "Teamleader";

    console.log("VAD SOM LIGGER ", loggedRole);
    return (
        <div>
            <h1>Employees</h1>
            <p>Skriva ut en lista över alla anställda</p>

            {loggedRole === teamLeader && loginProcess && <UserVisualize />}
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
