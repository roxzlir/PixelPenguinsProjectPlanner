import React from "react";
import PresentUser from "../components/PresentUser";

export default function CEO() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>CEO Page</h1>
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
