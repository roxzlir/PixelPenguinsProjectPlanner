import React from "react";
import ProjectReader from "../components/ProjectReader";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import PresentUser from "../components/PresentUser";
import ProjectHoursEdit from "../components/ProjectHoursEdit";

export default function DisplayProjects() {
    const userRole = localStorage.getItem("userRole");

    return (
        <div>
            <h1>Sida för att visa allt ut Projects</h1>
            <div>
                {userRole === "Employee" && (
                    <React.Fragment>
                        <ProjectReader />
                    </React.Fragment>
                )}
            </div>
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
