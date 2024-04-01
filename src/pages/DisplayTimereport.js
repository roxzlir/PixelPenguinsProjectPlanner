import React from "react";
import FilterTimereports from "../components/FilterTimereports";
import FilterProjectsReports from "../components/FilterProjectsReports";

export default function DisplayTimereport() {
    return (
        <main>
            <h1
                style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    fontFamily: "Graduate, serif",
                }}
            >
                Welcome to the page for all Timereport related information
            </h1>
            <FilterTimereports />
            <FilterProjectsReports />
        </main>
    );
}
