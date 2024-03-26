import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectInputEdit.css";

const ProjectHoursEdit = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [updatedHours, setUpdatedHours] = useState("");
    const [showReport, setShowReport] = useState(false);

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

    const handleSelectedProject = (event) => {
        const selectedId = event.target.value;
        const selectedProject = projects.find((item) => item.id === selectedId);
        setSelectedProject(selectedProject);
    };

    const handleHoursChange = (event) => {
        setUpdatedHours(event.target.value);
    };

    const handleHoursUpdate = async (e) => {
        // Lägg till logik för att uppdatera Timespan-datumet i din databas
        // Använd selectedProject för att få det valda projektet och newDate för det nya datumet
        // Utför en POST-anrop till din API med den uppdaterade informationen
        e.preventDefault();
        const updateData = {
            projectId: selectedProject.id,
            hours: parseInt(updatedHours),
        };

        if (!selectedProject || !updatedHours) {
            alert(
                `Please select how many hours you would like to set for project ${selectedProject.properties.Projectname.title[0].plain_text} before you register update`
            );
            return;
        }

        console.log("DETTA SKICKAS TILL UPPDATE: ", updateData);
        axios
            .patch("http://localhost:3001/api/update-project-hours", updateData)
            .then((response) => {
                console.log("Update SUCESS!: ", response.data);

                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `Project: ${selectedProject.properties.Projectname.title[0].plain_text} with previous planned hours: ${selectedProject.properties.Hours.number} has now been updated to: ${updatedHours} hours`;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`Project update added! \n${reportString}\n`);

                // Visa rapporten
                setShowReport(true);
                //*********************^^^^^^^^^^^ GJORT FRÅN TimeReportAddConfirmation ^^^^^^^^^^^^^^^********************** */
            })
            .catch((error) => {
                console.log("Update didn't post to server: ", error);
            });
    };

    projects.sort((a, b) => {
        const statusA = a.properties.Status.select.name;
        const statusB = b.properties.Status.select.name;
        if (statusA < statusB) {
            return -1;
        }
        if (statusA > statusB) {
            return 1;
        }
        return 0;
    });

    return (
        <div className="page-container">
            <div className="display-section">
                <h1>Current project with hours</h1>
                <h3>
                    Please click on the project you would like to change end
                    date for:
                </h3>
                <select
                    onChange={handleSelectedProject}
                    value={selectedProject?.id}
                    className="PIE-ulink"
                >
                    <option>Select a project</option>
                    {projects.map((project) => (
                        <option
                            value={project.id}
                            className="PIE-link"
                            key={project.id}
                        >
                            <p>
                                {" "}
                                {
                                    project.properties.Projectname.title[0]
                                        .plain_text
                                }
                            </p>
                            <p>
                                {" "}
                                Estimaded hours:
                                {project.properties.Hours.number}
                            </p>
                            <p>
                                {" "}
                                Worked hours:{" "}
                                {
                                    project.properties["Worked hours"].rollup
                                        .number
                                }
                            </p>
                            <p>
                                {" "}
                                Timespan:{" "}
                                {project.properties.Timespan.date ? (
                                    <>
                                        {project.properties.Timespan.date.start}{" "}
                                        - {project.properties.Timespan.date.end}
                                    </>
                                ) : (
                                    "No date"
                                )}{" "}
                                --{project.properties.Status.select.name}
                            </p>
                        </option>
                    ))}
                </select>
            </div>
            <div className="action-section">
                {selectedProject && (
                    <div>
                        <h2>
                            Update Estimaded hours for:{" "}
                            {
                                selectedProject.properties.Projectname.title[0]
                                    .plain_text
                            }
                            :
                        </h2>
                        <label>
                            New number of hours:
                            <input
                                type="number"
                                value={updatedHours}
                                onChange={handleHoursChange}
                            />
                        </label>
                        <button onClick={handleHoursUpdate}>Add update</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectHoursEdit;
