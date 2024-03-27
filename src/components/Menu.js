import React from "react";
import "../css/Menu.css";

import { NavLink } from "react-router-dom";

function Menu({ userRole, onLogout }) {
    return (
        <header className="menu-container">
            <nav>
                <ul className="menu-links">
                    <li className="menu-link">
                        <NavLink className={"nav-link"} to="/">
                            Home
                        </NavLink>
                    </li>
                    {userRole === "Employee" && (
                        <li className="menu-link">
                            <NavLink className={"nav-link"} to="/ReportTime">
                                Report Time
                            </NavLink>
                        </li>
                    )}
                    {(userRole === "Teamleader" || userRole === "CEO") && (
                        <>
                            <li className="menu-link">
                                <NavLink
                                    className={"nav-link"}
                                    to="/DisplayTimereport"
                                >
                                    Timereports
                                </NavLink>
                            </li>
                            <li className="menu-link">
                                <NavLink
                                    className={"nav-link"}
                                    to="/ReportTimeAll"
                                >
                                    Report Time
                                </NavLink>
                            </li>
                            <li className="menu-link">
                                <NavLink
                                    to="/DisplayProjects"
                                    className={"nav-link"}
                                >
                                    Projects
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li className="menu-link">
                        <button onClick={onLogout} className="logout-btn">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Menu;
