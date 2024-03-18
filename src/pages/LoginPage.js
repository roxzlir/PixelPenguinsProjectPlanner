import React from "react";
import LoginAuth from "../components/LoginAuth";
import AuthLogin from "../components/AuthLogin";

export default function LoginPage() {
    return (
        <div>
            <h1>Välkommen till vår logga in sida!</h1>
            <LoginAuth />
            {/* <AuthLogin /> */}
        </div>
    );
}
