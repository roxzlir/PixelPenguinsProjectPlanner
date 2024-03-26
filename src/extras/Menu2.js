import React from "react";
import { NavLink } from "react-router-dom";

const Menu2 = () => {
    const isLoggedIn = !!localStorage.getItem("loggedInUser");

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

// import React from "react";
// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { RoleAuth } from "./RoleAuth";
// import "../css/Menu.css";

// export default function Menu() {
//     const navTo = useNavigate();
//     const [logoutKey, setLogoutKey] = useState(0);

//     const [userRole, setUserRole] = useState("");

//     useEffect(() => {
//         const loggedInRole = localStorage.getItem("userRole");

//         if (loggedInRole) {
//             setUserRole(loggedInRole);
//         }
//     }, [logoutKey]);

//     function Logout() {
//         localStorage.removeItem("loggedInUser");
//         localStorage.removeItem("userRole");
//         navTo("/LoginPage");
//         setLogoutKey((prevKey) => prevKey + 1);
//     }

//     return (
//         <body>
//             <nav className="menu-container">
//                 <ul className="menu-links">
//                     <li className="menu-link">
//                         <NavLink to="/LoginPage" className={"nav-link"}>
//                             Login "ska bli Welcome"
//                         </NavLink>
//                     </li>
//                     {userRole === "Employee" && (
//                         <React.Fragment>
//                             <li className="menu-link">
//                                 <NavLink
//                                     to="/ReportTime"
//                                     className={"nav-link"}
//                                 >
//                                     Report Time
//                                 </NavLink>
//                             </li>
//                             <li className="menu-link">
//                                 <NavLink to="/" className={"nav-link"}>
//                                     Profile
//                                 </NavLink>
//                             </li>
//                         </React.Fragment>
//                     )}
//                     {userRole === "Teamleader" ||
//                         (userRole === "CEO" && (
//                             <React.Fragment>
//                                 <li className="menu-link">
//                                     <NavLink
//                                         to="/DisplayProjects"
//                                         className={"nav-link"}
//                                     >
//                                         Projects
//                                     </NavLink>
//                                 </li>
//                                 <li className="menu-link">
//                                     <NavLink
//                                         to="/DisplayTimereport"
//                                         className={"nav-link"}
//                                     >
//                                         Timereports
//                                     </NavLink>
//                                 </li>
//                                 <li className="menu-link">
//                                     <NavLink to="/" className={"nav-link"}>
//                                         Profile
//                                     </NavLink>
//                                 </li>
//                             </React.Fragment>
//                         ))}
//                     <br />
//                     <button onClick={Logout}>Logga ut</button>
//                 </ul>
//             </nav>
//         </body>
//     );
// }
