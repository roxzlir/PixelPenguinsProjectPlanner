import React from "react";
import ProjectReader from "../components/ProjectReader";
import TimereportReader from "../components/TimereportReader";
import ProjectInputEdit from "../components/ProjectInputEdit";

import PresentUser from "../components/PresentUser";

export default function DisplayProjects() {
    const loginProcess = localStorage.getItem("loggedInUser");
    // "access_token"
    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
            {loginProcess && <ProjectReader />}
            <br />
            {loginProcess && <TimereportReader />}
            <ProjectInputEdit />
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
