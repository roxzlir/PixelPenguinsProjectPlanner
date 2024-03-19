import React from "react";
import PeopleReader from "../components/PeopleReader";
import PresentUser from "../components/PresentUser";
import FilterTimereports from "../components/FilterTimereports";
import TimereportInputEdit from "../components/TimereportInputEdit";

export default function DisplayTimereport() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Sidan för att visa allt ur People</h1>
            {loginProcess && <PeopleReader />}
            <br />
            {loginProcess && <FilterTimereports />}
            <br />
            {/* {loginProcess && <TimereportInputEdit />} */}
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
