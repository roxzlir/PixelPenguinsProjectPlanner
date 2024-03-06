import "./App.css";
import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Employees from "./pages/Employees";
import ReportTime from "./pages/ReportTime";
import DisplayProjects from "./pages/DisplayProjects";
import Menu from "./components/Menu";
import DisplayPeople from "./pages/DisplayPeople";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Menu />
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/ReportTime" element={<ReportTime />} />
                        <Route
                            path="/DisplayProjects"
                            element={<DisplayProjects />}
                        />
                        <Route
                            path="/DisplayPeople"
                            element={<DisplayPeople />}
                        />
                        <Route path="/Employees" element={<Employees />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
