import React from "react";
import UserVisualize from "../components/UserVisualize";
import LoginAuth from "../components/LoginAuth";

export default function Start() {
    return (
        <main>
            <h1 style={{
                textAlign: "center",
                color: "whitesmoke",
                fontFamily: "Graduate, serif",
            }}>PIXEL PENGUINS PROJECT PLANNER</h1>
            <LoginAuth />
            <UserVisualize />
        </main>
    );
}
