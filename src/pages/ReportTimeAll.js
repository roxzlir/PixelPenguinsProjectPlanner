import React from "react";
import AddTimereport from "../components/AddTimereport";
import LoggedInTimereports from "../components/LoggedInTimereports";

export default function ReportTimeAll() {
    return (
        <main>
            <h1
                style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    fontFamily: "Graduate, serif",
                }}
            >
                Add new timereport on any employee
            </h1>
            <AddTimereport />
            <LoggedInTimereports />
        </main>
    );
}
