import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectInputEdit.css";

const ProjectInputEdit = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [newDate, setNewDate] = useState("");

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

    const handleDateChange = (event) => {
        setNewDate(event.target.value);
    };

    const handleDateUpdate = async (e) => {
        // Lägg till logik för att uppdatera Timespan-datumet i din databas
        // Använd selectedProject för att få det valda projektet och newDate för det nya datumet
        // Utför en POST-anrop till din API med den uppdaterade informationen
        e.preventDefault();
        const updateData = {
            projectId: selectedProject.id,
            updatedTime: newDate,
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
                            Uppdate end date for project:{" "}
                            {
                                selectedProject.properties.Projectname.title[0]
                                    .plain_text
                            }
                            :
                        </h2>
                        <input
                            type="date"
                            value={newDate}
                            onChange={handleDateChange}
                        />
                        <button onClick={handleDateUpdate}>Add update</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectInputEdit;
