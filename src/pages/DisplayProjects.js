import React from "react";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import Alert from "../components/Alerts";
import ActiveProjects from "../components/activeProjects";
import AddNewProject from "../components/AddNewProject";

export default function DisplayProjects() {
    return (
        <main className="DP-parent">
            <h1
                style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    fontFamily: "Graduate, serif",
                }}
            >
                Welcome to the page for all Project related information
            </h1>
            <AddNewProject />
            <Alert />
            <AlertCompareEndDate />
            <ActiveProjects />
        </main>
    );
}
