import React from "react";
import PresentUser from "../components/PresentUser";

export default function User() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>User Page</h1>
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
