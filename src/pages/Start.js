import React from "react";
import PresentUser from "../components/PresentUser";
import UserVisualize from "../components/UserVisualize";

export default function Start() {
    const userRole = localStorage.getItem("userRole");

    return (
        <div>
            <h1>WELCOME PAGE</h1>
            <p>Vi välkommnar till vår sida</p>
            <br />
            <br />
            {userRole && <UserVisualize />}
            <br />
            {userRole && <PresentUser />}
        </div>
    );
}
