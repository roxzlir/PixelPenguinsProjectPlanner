import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <body>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Start</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ReportTime">Report Time</NavLink>
                    </li>
                    <li>
                        <NavLink to="/DisplayProjects">
                            Display Projects
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/DisplayPeople">
                            Display People
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Employees">Employees</NavLink>
                    </li>
                </ul>
            </nav>
        </body>
    );
}
