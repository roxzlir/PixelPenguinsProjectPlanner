import React from "react";
import LogTimereport from "../components/LogTimereport";
import LoggedInTimereports from "../components/LoggedInTimereports";
import "../css/ReportTime.css";

export default function ReportTime() {
    return (
        <main className="ReportTime-container">
            <h1
                style={{
                    textAlign: "center",
                    color: "whitesmoke",
                    fontFamily: "Graduate, serif",
                }}
            >
                Please report your worked hours
            </h1>
            <LogTimereport />
            <LoggedInTimereports />
        </main>
    );
}
