import React from "react";
import PeopleReader from "../components/PeopleReader";
import PresentUser from "../components/PresentUser";

export default function DisplayPeople() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Sidan för att visa allt ur People</h1>
            {loginProcess && <PeopleReader />}
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
