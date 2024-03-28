import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProjectInputEdit.css"

function FilterProjectsReports() {
    const [timereports, setTimereports] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const projectsResponse = await axios.post(
                "http://localhost:3001/api/notion"
            );
            const formattedProjects = projectsResponse.data.results.map(
                (project) => ({
                    id: project.id,
                    name:
                        project.properties.Projectname.title[0]?.plain_text ||
                        "Unknown",
                })
            );
            setProjects(formattedProjects);

            const timereportsResponse = await axios.post(
                "http://localhost:3001/api/notion/timereports"
            );
            setTimereports(timereportsResponse.data.results);
        } catch (error) {
            console.log("Error occurred while fetching data:", error);
        }
    }

    function filterTimereports() {
        if (!selectedProject) {
            return timereports;
        } else {
            // Filter timereports based on the selected project
            return timereports.filter((report) =>
                report.properties.Project.relation.some(
                    (project) => project.id === selectedProject
                )
            );
        }
    }

    return (
        <div className="page-container">
            <div className="table-container">
                <label>Select a project:</label>
                <select
                    className="PIE-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    <option value="">All</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                <table className="timereport-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Project</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterTimereports().map((report) => (
                            <tr key={report.id}>
                                {" "}
                                <td>{report.properties.Date.date.start}</td>
                                <td>{report.properties.Hours.number}</td>
                                <td>
                                    {" "}
                                    {projects.find(
                                        (project) =>
                                            project.id ===
                                            report.properties.Project
                                                .relation[0].id
                                    )?.name || "Unknown"}
                                </td>
                                <td>
                                    {" "}
                                    {report.properties.Note?.title?.[0]
                                        ?.plain_text || "No note"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FilterProjectsReports;
