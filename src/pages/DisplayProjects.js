import React from "react";
import ProjectInputEdit from "../components/ProjectInputEdit";
import AlertCompareEndDate from "../components/AlertCompareEndDate";
import ProjectHoursEdit from "../components/ProjectHoursEdit";
import Alert from "../components/Alerts";
import ActiveProjects from "../components/activeProjects";
import AddNewProject from "../components/AddNewProject";

export default function DisplayProjects() {
    return (
        <main className="DP-parent">
            <AddNewProject />
            <section className="DP-top">
                <Alert />
                <AlertCompareEndDate />
                <ActiveProjects />
            </section>
            <section className="DP-left">
                <ProjectInputEdit />
            </section>
            <section className="DP-right">
                <ProjectHoursEdit />
            </section>
        </main>
    );
}
