import React from "react";
import UserVisualize from "../components/UserVisualize";
import LoginAuth from "../components/LoginAuth";

export default function Start() {
    return (
        <div>
            <h1>WELCOME</h1>
            <LoginAuth />
            <UserVisualize />
        </div>
    );
}
