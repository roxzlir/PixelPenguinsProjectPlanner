import React from "react";
import { NavLink } from "react-router-dom";

const Menu2 = () => {
    const isLoggedIn = !!localStorage.getItem("access_token");

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/LoginPage">
                        {isLoggedIn ? "Logout" : "Login"}
                    </NavLink>
                </li>
                {isLoggedIn && (
                    <li>
                        <NavLink to="/ReportTime">Report Time</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Menu2;
