import React from "react";

import { NavLink } from "react-router-dom";

function Menu({ userRole, onLogout }) {
    return (
        <header className="App-header">
            <nav>
                <ul className="menuList">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {userRole === "Employee" && (
                    <li>
                        <NavLink to="/ReportTime">Report Time</NavLink>
                    </li>
                     )}
                     {(userRole === "Teamleader" || userRole === "CEO") && (
                     <>
                    <li>
                        <NavLink to="/DisplayTimereport">Timereports</NavLink>
                    </li>
                    <li className="menu-link">
                        <NavLink to="/DisplayProjects" className={"nav-link"}>
                            Projects
                        </NavLink>
                    </li>
                    </>
                    )}
                    <li>
                        <button onClick={onLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Menu; 
