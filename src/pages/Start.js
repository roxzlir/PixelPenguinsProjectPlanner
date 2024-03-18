import React from "react";
import PresentUser from "../components/PresentUser";

export default function Start() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Startsidan!</h1>
            <p>Vi välkommnar till vår sida</p>
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
