// import "./App.css";
// import React, { useState } from "react";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import Start from "./pages/Start";
// import LoginPage from "./pages/LoginPage";

// import Employees from "./pages/Employees";
// import ReportTime from "./pages/ReportTime";
// import DisplayProjects from "./pages/DisplayProjects";
// import Menu from "./components/Menu";
// import DisplayPeople from "./pages/DisplayPeople";
// import User from "./pages/User";
// import CEO from "./pages/CEO";
// import AuthLogin from "./components/AuthLogin";
// import AuthVerify from "./components/AuthVerify";
// import Menu2 from "./components/Menu2";
// // import PrivateRoute from "./components/PrivateRoute"; // Importera PrivateRoute

// function App2() {
//     return (
//         <div>
//             <Router>
//                 <Menu2 />
//                 <Routes>
//                     <Route path="/" element={<Start />} />
//                     <Route path="/LoginPage" element={<LoginPage />} />
//                     <Route
//                         path="/ReportTime"
//                         element={
//                             <AuthVerify>
//                                 <ReportTime />
//                             </AuthVerify>
//                         }
//                     />
//                 </Routes>
//             </Router>
//         </div>
//     );
// }

// export default App2;

// // function App2() {
// //     const [isLoggedIn, setIsLoggedIn] = useState(false);

// //     // Funktion för att hantera inloggning
// //     const handleLogin = () => {
// //         setIsLoggedIn(true); // Användaren är inloggad
// //     };

// //     // Funktion för att hantera utloggning
// //     const handleLogout = () => {
// //         setIsLoggedIn(false); // Användaren är utloggad
// //     };

// //     return (
// //         <Router>
// //             <div className="App">
// //                 <header className="App-header">
// //                     <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
// //                 </header>
// //                 <main>
// //                     <Routes>
// //                         <Route path="/" element={<Start />} />
// //                         <Route
// //                             path="/login"
// //                             element={<VisualizeLogin onLogin={handleLogin} />}
// //                         />
// //                         <PrivateRoute
// //                             path="/ReportTime"
// //                             element={<ReportTime />}
// //                             isLoggedIn={isLoggedIn}
// //                             routhpath=
// //                         />
// //                         <PrivateRoute
// //                             path="/DisplayProjects"
// //                             element={<DisplayProjects />}
// //                             isLoggedIn={isLoggedIn}
// //                         />
// //                         <PrivateRoute
// //                             path="/DisplayPeople"
// //                             element={<DisplayPeople />}
// //                             isLoggedIn={isLoggedIn}
// //                         />
// //                         <PrivateRoute
// //                             path="/Employees"
// //                             element={<Employees />}
// //                             isLoggedIn={isLoggedIn}
// //                         />
// //                         <PrivateRoute
// //                             path="/User"
// //                             element={<User />}
// //                             isLoggedIn={isLoggedIn}
// //                         />
// //                         <PrivateRoute
// //                             path="/CEO"
// //                             element={<CEO />}
// //                             isLoggedIn={isLoggedIn}
// //                         />
// //                     </Routes>
// //                 </main>
// //             </div>
// //         </Router>
// //     );
// // }

// // export default App2;
