import React from "react";
import { NavLink, useHistory } from "react-router-dom";

export default function Menu() {
    // const history = useHistory();

    function Logout() {
        localStorage.removeItem("loggedInUser");
        // history.push("/");
    }

    // const reloadButton = document.getElementById("reloadButton");

    // reloadButton.addEventListener("click", function () {
    //     location.reload();
    // });

    return (
        <body>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/LoginPage">
                            Login "ska bli Welcome"
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ReportTime">Report Time</NavLink>
                    </li>
                    <li>
                        <NavLink to="/DisplayTimereport">Timereports</NavLink>
                    </li>
                    <li>
                        <NavLink to="/DisplayProjects">Projects</NavLink>
                    </li>
                    <br />
                    <button onClick={Logout}>Logga ut</button>
                </ul>
            </nav>
        </body>
    );
}
