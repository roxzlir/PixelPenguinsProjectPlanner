import React from "react";
import ProjectReader from "../components/ProjectReader";
import TimereportReader from "../components/TimereportReader";

import PresentUser from "../components/PresentUser";

export default function DisplayProjects() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
            {loginProcess && <ProjectReader />}
            <br />
            {loginProcess && <TimereportReader />}
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
