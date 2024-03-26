import React from "react";
import LoginAuth from "../components/LoginAuth";
import PresentUser from "../components/PresentUser";

export default function LoginPage() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Välkommen till vår logga in sida!</h1>
            <LoginAuth />
            <br />

            {loginProcess && <PresentUser />}
        </div>
    );
}
