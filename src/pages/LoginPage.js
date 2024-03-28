import React from "react";
import LoginAuth from "../components/LoginAuth";
import UserVisualize from "../components/UserVisualize";

//KÖR FLEXBOXAR MED FLEX 1 på bägge boxarna.
export default function LoginPage() {
    const loginprocess = localStorage.getItem("loggedInUser");
    return (
        <main className="LoginPage-container">
            <section className="LP-left">
                {loginprocess && <UserVisualize />}
            </section>
            <section className="LP-right">
                <LoginAuth />
            </section>
        </main>
    );
}
