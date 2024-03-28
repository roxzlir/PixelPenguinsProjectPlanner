import { useState } from "react";
import React from "react";
import "../css/Menu.css";

import { NavLink } from "react-router-dom";

function Menu({ userRole, onLogout }) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <header className="menu-container">
            <nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className="menu-toggle-bar"></div>
                    <div className="menu-toggle-bar"></div>
                    <div className="menu-toggle-bar"></div>
                </div>
                <ul className={`menu-links ${showMenu ? "show" : ""}`}>
                    <li className="menu-link">
                        <NavLink
                            className={"nav-link"}
                            to="/"
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                    </li>
                    {userRole === "Employee" && (
                        <li className="menu-link">
                            <NavLink
                                className={"nav-link"}
                                to="/ReportTime"
                                onClick={closeMenu}
                            >
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
                                    onClick={closeMenu}
                                >
                                    Timereports
                                </NavLink>
                            </li>
                            <li className="menu-link">
                                <NavLink
                                    className={"nav-link"}
                                    to="/ReportTimeAll"
                                    onClick={closeMenu}
                                >
                                    Report Time
                                </NavLink>
                            </li>
                            <li className="menu-link">
                                <NavLink
                                    to="/DisplayProjects"
                                    className={"nav-link"}
                                    onClick={closeMenu}
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
