import React, { useState } from "react";
import axios from "axios";
import "../css/AddNewProject.css";

export default function AddNewProject() {
    const [projectName, setProjectName] = useState("");
    const [hours, setHours] = useState("");
    const [status, setStatus] = useState("Next Up");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    };

    const handleHoursChange = (event) => {
        setHours(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/api/add-project",
                {
                    projectName,
                    hours: parseInt(hours),
                    status,
                    startDate,
                    endDate,
                }
            );

            const addedSuccses = `Name: ${projectName}
                Hours: ${hours} 
                With status: ${status}
                Date for project: ${startDate} - ${endDate}`;
            alert(`${addedSuccses}\n Have been added to the project database`);
        } catch (error) {
            console.error("Error adding new project:", error);
        }
    };

    return (
        <main className="ANP-container">
            <h3 style={{ fontFamily: "Graduate, serif" }}>
                Please fill all fileds to add a new project:
            </h3>
            <form className="ANP-form" onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input
                        className="ANP-input"
                        type="text"
                        value={projectName}
                        onChange={handleProjectNameChange}
                    />
                </label>
                <label>
                    Worked Hours:
                    <input
                        className="ANP-input"
                        type="number"
                        value={hours}
                        onChange={handleHoursChange}
                    />
                </label>
                <label>
                    Status:
                    <select
                        className="ANP-select"
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="Next Up">Next Up</option>
                        <option value="Active">Active</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <label>
                    Start Date:
                    <input
                        className="ANP-input"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        className="ANP-input"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </label>
                <button className="button-42" type="submit">
                    Save
                </button>
            </form>
        </main>
    );
}
