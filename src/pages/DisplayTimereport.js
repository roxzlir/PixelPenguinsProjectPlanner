import React from "react";
import FilterTimereports from "../components/FilterTimereports";
import TimereportInputEdit from "../components/TimereportInputEdit";
import FilterProjectsReports from "../components/FilterProjectsReports";


export default function DisplayTimereport() {
    return (
        <div className="DT-parent">
            <h1>Timereports</h1>
            <section className="DT-left">
                <FilterTimereports />
            </section>
            <section className="DT-right">
                <FilterProjectsReports />
            </section>
            <section className="DT-bottom">
                <TimereportInputEdit />
            </section>
        </div>
    );
}
