import React from "react";
import LoginAuth from "../components/LoginAuth";
import UserVisualize from "../components/UserVisualize";

export default function LoginPage() {
    const loginprocess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Welcome!</h1>
            <h2>Please log in</h2>
            {loginprocess && <UserVisualize />}
            <LoginAuth />
        </div>
    );
}
