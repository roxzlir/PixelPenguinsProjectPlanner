import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectInputEdit.css";

const ProjectInputEdit = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion", payload)
            .then((response) => {
                setProjects(response.data.results);
                console.log("Datan vi hämtar från Notion: ", response.data);
            })
            .catch((error) => {
                console.log(
                    "Fel inträffade vid hämtningen från Notion: ",
                    error
                );
            });
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        console.log("Det som klickats på ", project);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleDateUpdate = async (e) => {
        // Lägg till logik för att uppdatera Timespan-datumet i din databas
        // Använd selectedProject för att få det valda projektet och newDate för det nya datumet
        // Utför en POST-anrop till din API med den uppdaterade informationen
        e.preventDefault();

        if (!selectedProject || !startDate || !endDate) {
            console.error("Alla fält måste vara ifyllda.");
            return;
        }

        const updateData = {
            projectId: selectedProject.id,
            startDate: startDate,
            endDate: endDate,
        };
        console.log("DETTA SKICKAS TILL UPPDATE: ", updateData);
        axios
            .patch("http://localhost:3001/api/update-project", updateData)
            .then((response) => {
                console.log("Update SUCESS!: ", response.data);
            })
            .catch((error) => {
                console.log("Update didn't post to server: ", error);
            });
    };

    return (
        <div className="page-container">
            <div className="display-section">
                <h1>Current project and timespan</h1>
                <h3>
                    Please click on the project you would like to change end
                    date for:
                </h3>
                <ul className="PIE-ulink">
                    {projects.map((project) => (
                        <li
                            className="PIE-link"
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                        >
                            <p>
                                {" "}
                                Project name:{" "}
                                {
                                    project.properties.Projectname.title[0]
                                        .plain_text
                                }
                            </p>
                            <p>
                                {" "}
                                Current timespan:{" "}
                                {project.properties.Timespan.date ? (
                                    <>
                                        {project.properties.Timespan.date.start}{" "}
                                        - {project.properties.Timespan.date.end}
                                    </>
                                ) : (
                                    "No date"
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="action-section">
                {selectedProject && (
                    <div>
                        <h2>
                            Update start and end date for project{" "}
                            {
                                selectedProject.properties.Projectname.title[0]
                                    .plain_text
                            }
                            :
                        </h2>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                            />
                        </label>
                        <button onClick={handleDateUpdate}>Add update</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectInputEdit;
