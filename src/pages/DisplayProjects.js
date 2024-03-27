import React from "react";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import ProjectHoursEdit from "../components/ProjectHoursEdit";
import Alert from "../components/Alerts";
import ActiveProjects from "../components/activeProjects";

export default function DisplayProjects() {
    return (
        <div>
            <Alert />
            <AlertCompareEndDate />
            <ProjectInputEdit />
            <ProjectHoursEdit />
            <ActiveProjects />
        </div>
    );
}
