import React from "react";

export default function ProjectManager() {
    const loginProcess = localStorage.getItem("loggedInUser");
    return (
        <div>
            <h1>Sida för Projektledare</h1>
            <br />
            <br />
            <br />
            {loginProcess && <PresentUser />}
        </div>
    );
}
