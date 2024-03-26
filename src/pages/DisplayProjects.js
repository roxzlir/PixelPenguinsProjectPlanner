import React from "react";
import ProjectReader from "../components/ProjectReader";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import PresentUser from "../components/PresentUser";
import ActiveProjects from "../components/activeProjects";

export default function DisplayProjects() {
    const loginProcess = localStorage.getItem("loggedInUser");

    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
            {loginProcess && <ActiveProjects/>}
            {loginProcess && <ProjectReader />}
            {loginProcess && <AlertCompareEndDate />}
            <br />
            {/* {loginProcess && <TimereportReader />} */}
            {loginProcess && <ProjectInputEdit />}
            <br />

            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
