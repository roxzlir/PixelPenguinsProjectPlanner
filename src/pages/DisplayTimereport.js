import React from "react";
import FilterTimereports from "../components/FilterTimereports";
import TimereportInputEdit from "../components/TimereportInputEdit";
import FilterProjectsReports from "../components/FilterProjectsReports";
export default function DisplayTimereport() {

    return (
        <div>
            <h1>Timereports</h1>

            <FilterTimereports/>
            <FilterProjectsReports/>
            <TimereportInputEdit/>
        </div>
    );
}
