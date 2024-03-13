// import "./App.css";
// import React, { useState, useEffect } from "react";
// import {
//     HashRouter as Router,
//     Route,
//     Routes,
//     Navigate,
// } from "react-router-dom";
// import Start from "./pages/Start";
// import VisualizeLogin from "./components/VisualizeLogin";
// import Employees from "./pages/Employees";
// import ReportTime from "./pages/ReportTime";
// import DisplayProjects from "./pages/DisplayProjects";
// import Menu from "./components/Menu";
// import DisplayPeople from "./pages/DisplayPeople";
// import User from "./pages/User";
// import CEO from "./pages/CEO";
// import AuthLogin from "./components/AuthLogin";

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [loggedInUser, setLoggedInUser] = useState(null);

//     // Läs inloggad användare från localStorage vid komponentens montering
//     useEffect(() => {
//         const user = localStorage.getItem("loggedInUser");
//         if (user) {
//             setLoggedInUser(user);
//             setIsLoggedIn(true);
//         }
//     }, []);

//     // Funktion för att hantera inloggning
//     const handleLogin = (user) => {
//         setLoggedInUser(user);
//         setIsLoggedIn(true);
//         // Spara inloggad användare i localStorage
//         localStorage.setItem("loggedInUser", user);
//     };

//     // Funktion för att hantera utloggning
//     const handleLogout = () => {
//         setLoggedInUser(null);
//         setIsLoggedIn(false);
//         // Ta bort inloggad användare från localStorage
//         localStorage.removeItem("loggedInUser");
//     };

//     return (
//         <Router>
//             <div className="App">
//                 <header className="App-header">
//                     <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
//                 </header>
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<Start />} />
//                         <Route
//                             path="/login"
//                             element={<VisualizeLogin onLogin={handleLogin} />}
//                         />
//                         {/* Skyddade rutter */}
//                         {isLoggedIn ? (
//                             <>
//                                 <Route
//                                     path="/ReportTime"
//                                     element={<ReportTime />}
//                                 />
//                                 <Route
//                                     path="/DisplayProjects"
//                                     element={<DisplayProjects />}
//                                 />
//                                 <Route
//                                     path="/DisplayPeople"
//                                     element={<DisplayPeople />}
//                                 />
//                                 <Route
//                                     path="/Employees"
//                                     element={<Employees />}
//                                 />
//                                 <Route path="/User" element={<User />} />
//                                 <Route path="/CEO" element={<CEO />} />
//                             </>
//                         ) : (
//                             <Route
//                                 element={
//                                     <Navigate to="/login" replace={true} />
//                                 }
//                             />
//                         )}
//                     </Routes>
//                 </main>
//             </div>
//         </Router>
//     );
// }

// export default App;

import "./App.css";
import React, { useState } from "react";
import {
    HashRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Start from "./pages/Start";
import VisualizeLogin from "./components/VisualizeLogin";
import Employees from "./pages/Employees";
import ReportTime from "./pages/ReportTime";
import DisplayProjects from "./pages/DisplayProjects";
import Menu from "./components/Menu";
import DisplayPeople from "./pages/DisplayPeople";
import User from "./pages/User";
import CEO from "./pages/CEO";
import AuthLogin from "./components/AuthLogin";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Funktion för att hantera inloggning
    const handleLogin = () => {
        setIsLoggedIn(true); // Tillfällig simulering av inloggning
    };
    const handleLogout = () => {
        setIsLoggedIn(false); // Användaren är utloggad
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route
                            path="/login"
                            element={<VisualizeLogin onLogin={handleLogin} />}
                        />
                        {/* Skyddade rutter */}
                        {isLoggedIn ? (
                            <>
                                <Route
                                    path="/ReportTime"
                                    element={<ReportTime />}
                                />
                                <Route
                                    path="/DisplayProjects"
                                    element={<DisplayProjects />}
                                />
                                <Route
                                    path="/DisplayPeople"
                                    element={<DisplayPeople />}
                                />
                                <Route
                                    path="/Employees"
                                    element={<Employees />}
                                />
                                <Route path="/User" element={<User />} />
                                <Route path="/CEO" element={<CEO />} />
                            </>
                        ) : (
                            <Route
                                element={
                                    <Navigate to="/login" replace={true} />
                                }
                            />
                        )}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

// export default function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <header className="App-header">
//                     <Menu />
//                 </header>
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<Start />} />
//                         <Route path="/ReportTime" element={<ReportTime />} />
//                         <Route
//                             path="/DisplayProjects"
//                             element={<DisplayProjects />}
//                         />
//                         <Route
//                             path="/DisplayPeople"
//                             element={<DisplayPeople />}
//                         />
//                         <Route path="/Employees" element={<Employees />} />
//                         <Route path="/User" element={<User />} />
//                         <Route path="/CEO" element={<CEO />} />
//                     </Routes>
//                 </main>
//             </div>
//         </Router>
//     );
// }
