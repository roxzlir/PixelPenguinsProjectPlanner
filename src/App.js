import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Start from "./pages/Start";
import ReportTime from "./pages/ReportTime";
import DisplayProjects from "./pages/DisplayProjects";
import Menu from "./components/Menu";
import DisplayTimereport from "./pages/DisplayTimereport";
import LoginPage from "./pages/LoginPage";
import "./css/baseCSSTest.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        const userRole = localStorage.getItem("userRole");

        if (loggedInUser && userRole) {
          setIsLoggedIn(true);
          setUserRole(userRole);
        }
        getRoleData();

    }, 
[]);


const getRoleData = async () => {
  try {
      const response = await fetch('/api/notion/people');
      if (!response.ok) {
          throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      // Assuming data is an array of users, you might loop through each user
      data.results.forEach(user => {
          const role = user.properties.Role.rich_text[0].plain_text;
          console.log('User Role:', role);
          // Here you can set the user role in state or perform any other actions
          setUserRole(role); // Update the state with the fetched user role
      });
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}



    
    const handleLogin = () => {
        setIsLoggedIn(true);
        setUserRole(userRole);
        // Directly after logging in
        window.location.reload();    
      };

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        setUserRole("");
        setIsLoggedIn(false);
        // Directly after logout
        window.location.href = "/#/LoginPage";
    };

    return (
        <Router>
            <div className="App">
            {isLoggedIn && <Menu userRole={userRole} onLogout={handleLogout} />}                <main>
                    <Routes>
                <Route path="/LoginPage" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/" element={<Start />} />
                {isLoggedIn && (
                <>
                {userRole === "Employee" &&(
                <Route path="/ReportTime" element={<ReportTime />} />
                )}
                
                {(userRole === "Teamleader" || userRole === "CEO") && (
                <>
                    <Route
                        path="/DisplayTimereport" element={<DisplayTimereport />}/>
                    <Route path="/DisplayProjects" element={<DisplayProjects />} />
                    </>
                                )}
                </>
                
            )}
              
                        {!isLoggedIn && <Route path="*" element={<Navigate to="/LoginPage" />} />}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

