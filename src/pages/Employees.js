import React from "react";
import PresentUser from "../components/PresentUser";
import UserVisualize from "../components/UserVisualize";

export default function Employees() {
    const loginProcess = localStorage.getItem("loggedInUser");
    // if (loginProcess === "Angelica Lind") {
    //     return const teamleader;
    // }
    // else {
    //     return const worker;
    // }
    return (
        <div>
            <h1>Employees</h1>
            <p>Skriva ut en lista över alla anställda</p>
            {loginProcess && <UserVisualize />}
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
