import React, { useState, useEffect } from "react";
import "../css/AlertCompareED.css";
import axios from "axios";

export default function AlertCompareEndDate() {
    const [data, setData] = useState(null);

    // get data from project db, notion
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/notion"
                );
                setData(response.data);
            } catch (error) {
                console.log("Error fetching data from Notion: ", error);
            }
        };

        fetchData();
    }, []);

    // function to sort projects by status name and worked hours
    const projectDataHours = () => {
        if (data && Array.isArray(data.results)) {
            // array with all projects, sort by endDate first for Active projects, then status
            const sortedProjects = [...data.results].sort((a, b) => {
                // Compare endDate first for Active projects
                const status1 = a.properties.Status.select.name;
                const status2 = b.properties.Status.select.name;

                if (status1 === "Active" && status2 === "Active") {
                    const endDateA = new Date(a.properties.Timespan.date.end);
                    const endDateB = new Date(b.properties.Timespan.date.end);
                    if (endDateA < endDateB) return -1;
                    if (endDateA > endDateB) return 1;
                }

                // Comparing status order by name
                const statusOrder = { Active: 1, "Next Up": 2, Done: 3 }; // order of status in tabel later
                const orderA = statusOrder[status1];
                const orderB = statusOrder[status2];

                // Comparing ordder
                if (orderA < orderB) return -1;
                if (orderA > orderB) return 1;
                return 0;
            });

            // mapping projects
            return sortedProjects.map((hours) => {
                const totalHours = hours.properties.Hours.number;
                const workedHours =
                    hours.properties["Worked hours"].rollup.number;
                const hoursLeft = hours.properties["Hours left"].formula.number;
                const projectName =
                    hours.properties.Projectname.title[0].text.content;
                const endDate = new Date(hours.properties.Timespan.date.end);
                const activeProject = hours.properties.Status.select.name;
                const startDate = new Date(
                    hours.properties.Timespan.date.start
                );
                const today = new Date();
                const daysLeft = Math.ceil(
                    (endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
                );

                let warningMessage; // if active check deys left
                if (activeProject === "Active") {
                    if (daysLeft <= 0) {
                        // no days left, check enddate!
                        warningMessage = "End Date!";
                    } else {
                        warningMessage = `Days left: ${daysLeft}`;
                    }
                }
                if (activeProject === "Next Up") {
                    // if Next Up check days until start
                    const daysUntilStart = Math.ceil(
                        (startDate.getTime() - today.getTime()) /
                            (1000 * 3600 * 24)
                    );
                    warningMessage =
                        daysUntilStart > 0 // more than 0 Days left
                            ? `Days until start: ${daysUntilStart}`
                            : "Active?"; // Active not next up?
                }

                let style = {}; // set style background by status
                if (activeProject === "Active") {
                    style = { backgroundColor: "green" };
                } else if (activeProject === "Next Up") {
                    style = { backgroundColor: "yellow" };
                } else if (activeProject === "Done") {
                    style = { backgroundColor: "lightcoral" };
                }

                // return data and make table, give warnings, style for statuscolor
                return (
                    <tr key={hours.id} style={style}>
                        <td style={{ backgroundColor: "white" }}>
                            {projectName}
                        </td>
                        <td>{totalHours}</td>
                        <td>{hoursLeft}</td>
                        <td>{workedHours}</td>
                        <td>
                            {startDate.toDateString()} -{" "}
                            {endDate.toDateString()}
                        </td>
                        <td>{activeProject}</td>
                        {warningMessage && (
                            <td
                                style={{
                                    color: "red",
                                    backgroundColor: "white",
                                }}
                            >
                                {warningMessage}
                            </td>
                        )}
                    </tr>
                );
            });
        }
    };

    if (!data || !Array.isArray(data?.results)) {
        // If data doesn't exist or no array
        return <p>Loading data / No data to display...</p>;
    }

    // If data exists
    return (
        <main className="ACEDtable-container">
            <h2>Summary, sortet by status - Alerts</h2>
            <table className="ACED-table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Total Hours</th>
                        <th>Hours left</th>
                        <th>Worked Hours</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th style={{ backgroundColor: "red" }}>Warnings</th>
                    </tr>
                </thead>
                <tbody>{projectDataHours()}</tbody>
            </table>
        </main>
    );
}
