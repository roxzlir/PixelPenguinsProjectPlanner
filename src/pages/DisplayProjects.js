import React from "react";
import ProjectReader from "../components/ProjectReader";
import TimereportReader from "../components/TimereportReader";
import Test1projectReader from "../components/Test1projectReader";

export default function DisplayProjects() {
    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
            <ProjectReader />
            <br />
            <TimereportReader />
            <br />
            {/* <Test1projectReader /> */}
        </div>
    );
}
