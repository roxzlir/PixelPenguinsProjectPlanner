import React from "react";
import ProjectReader from "../components/ProjectReader";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import PresentUser from "../components/PresentUser";
import ProjectHoursEdit from "../components/ProjectHoursEdit";
import ActiveProjects from "../components/activeProjects";


export default function DisplayProjects() {
    const userRole = localStorage.getItem("userRole");

    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>

            {loginProcess && <ActiveProjects/>}
            {loginProcess && <ProjectReader />}
            {loginProcess && <AlertCompareEndDate />}
            <br />
            <div>
                {userRole === "Teamleader" ||
                    (userRole === "CEO" && (
                        <React.Fragment>
                            <ProjectInputEdit />
                            <ProjectHoursEdit />
                            <AlertCompareEndDate />
                        </React.Fragment>
                    ))}
                <br />
                <br />
                {userRole && <PresentUser />}
            </div>
        </div>
    );
}
