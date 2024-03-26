import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../css/Menu.css";

export default function Menu() {
    const history = useNavigate();

    function Logout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userRole");
        localStorage.removeItem("loggedInId");
        history("/");
    }

    return (
        <body>
            <nav className="menu-container">
                <ul className="menu-links">
                    <li className="menu-link">
                        <NavLink to="/LoginPage" className={"nav-link"}>
                            Login "ska bli Welcome"
                        </NavLink>
                    </li>
                    <li className="menu-link">
                        <NavLink to="/" className={"nav-link"}>
                            Profile
                        </NavLink>
                    </li>

                    <li className="menu-link">
                        <NavLink to="/ReportTime" className={"nav-link"}>
                            Report Time
                        </NavLink>
                    </li>
                    <li className="menu-link">
                        <NavLink to="/DisplayTimereport" className={"nav-link"}>
                            Timereports
                        </NavLink>
                    </li>
                    <li className="menu-link">
                        <NavLink to="/DisplayProjects" className={"nav-link"}>
                            Projects
                        </NavLink>
                    </li>
                    <br />
                    <button onClick={Logout}>Logga ut</button>
                </ul>
            </nav>
        </body>
    );
}
