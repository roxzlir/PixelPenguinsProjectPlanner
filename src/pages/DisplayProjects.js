import React from "react";
import ProjectReader from "../components/ProjectReader";
import TimereportReader from "../components/TimereportReader";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import PresentUser from "../components/PresentUser";

export default function DisplayProjects() {
    const loginProcess = localStorage.getItem("loggedInUser");
    // "access_token"
    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
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
