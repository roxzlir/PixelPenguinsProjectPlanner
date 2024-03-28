import React from "react";
import AddTimereport from "../components/AddTimereport";
import LoggedInTimereports from "../components/LoggedInTimereports";

export default function ReportTimeAll() {
    return (
        <div>
            <AddTimereport />
            <LoggedInTimereports />
        </div>
    );
}
