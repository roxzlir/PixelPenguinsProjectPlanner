import React from "react";
import LoginAuth from "../components/LoginAuth";
import UserVisualize from "../components/UserVisualize";

export default function LoginPage() {
    const loginprocess = localStorage.getItem("loggedInUser");
    return (
        <main>
            <h1
                style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    fontFamily: "Graduate, serif",
                }}
            >
                Welcome to Pixel Penguins Project Planner
            </h1>
            {loginprocess && <UserVisualize />}

            {!loginprocess && <LoginAuth />}
        </main>
    );
}
