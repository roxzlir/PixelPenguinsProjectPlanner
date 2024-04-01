import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ActiveProjects.css";
import ProjectTimespanEdit from "./ProjectTimespanEdit";
import ProjectEditHours from "./ProjectEditHours";

function ActiveProjects() {
    const [data, setData] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");

    const [selectedProject, setSelectedProject] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setShowEditModal(true);
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/notion"
            );
            setData(response.data);
        } catch (error) {
            console.log("Error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const filteredProjects = data.results.filter((item) => {
        if (statusFilter === "All") {
            return true;
        } else {
            return item.properties.Status.select.name === statusFilter;
        }
    });

    return (
        <main className="ap-page-container">
            <section className="ap-table-container">
                <thead>
                    {/* <h3 style={{ textAlign: "center" }}>Active projects</h3> */}
                    <label htmlFor="statusFilter">Filter by status:</label>
                    <select
                        className="PIE-select"
                        id="statusFilter"
                        value={statusFilter}
                        onChange={handleStatusFilterChange}
                    >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Next Up">Next Up</option>
                        <option value="Done">Done</option>
                    </select>
                </thead>
            </section>

            <table className="ap-timereport-table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Hours</th>
                        <th>Hours left</th>
                        <th>Hours worked</th>
                        <th>Status</th>
                        <th>Date span</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map((item) => (
                        <tr key={item.id}>
                            <td>
                                {
                                    item.properties.Projectname.title[0]
                                        .plain_text
                                }
                            </td>
                            <td>{item.properties.Hours.number}</td>
                            <td>
                                {item.properties["Hours left"].formula.number}
                            </td>
                            <td>
                                {item.properties["Worked hours"].rollup.number}
                            </td>
                            <td>{item.properties.Status.select.name}</td>
                            <td>
                                {item.properties.Timespan.date ? (
                                    <>
                                        {item.properties.Timespan.date.start} -{" "}
                                        {item.properties.Timespan.date.end}
                                    </>
                                ) : (
                                    "No date"
                                )}
                            </td>
                            <td>
                                <button
                                    className="standard-btn"
                                    onClick={() => handleEditProject(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditModal && (
                <section className="modal">
                    <main className="modal-content">
                        <aside>
                            <ProjectTimespanEdit
                                selectedProject={selectedProject}
                                onClose={() => setShowEditModal(false)}
                            />
                        </aside>
                        <aside>
                            <ProjectEditHours
                                selectedProject={selectedProject}
                                onClose={() => setShowEditModal(false)}
                            />
                        </aside>
                    </main>
                </section>
            )}
        </main>
    );
}

export default ActiveProjects;
