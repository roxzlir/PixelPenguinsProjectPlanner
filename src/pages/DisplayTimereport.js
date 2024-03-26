import React from "react";
import PeopleReader from "../components/PeopleReader";
import PresentUser from "../components/PresentUser";
import FilterTimereports from "../components/FilterTimereports";
import TimereportInputEdit from "../components/TimereportInputEdit";
import TimereportReader from "../components/TimereportReader";
import ProjectReportsReader from "../components/FilterProjectsReports";

export default function DisplayTimereport() {
    const userRole = localStorage.getItem("userRole");

    return (
        <div>
            <h1>Sidan för att visa allt ur People</h1>

            <br />
            {loginProcess && <ProjectReportsReader />}
            <br />

            {loginProcess && <PeopleReader />}
            <br />
            {loginProcess && <FilterTimereports />}
            <br />

            {/* <br />
            {userRole === "Teamleader" ||
                (userRole === "CEO" && (
                    <React.Fragment>
                        <h2>Här körs det för Teamleader och CEO</h2>
                        <FilterTimereports />
                        <TimereportInputEdit />
                    </React.Fragment>
                ))}
*/
            <br />

            {loginProcess && <PresentUser />}


        </div>
    );
}
