import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectInputEdit = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `Project: ${selectedProject.properties.Projectname.title[0].plain_text} with previous timespan: ${selectedProject.properties.Timespan.date.start} - ${selectedProject.properties.Timespan.date.end} has now been updated with dates: ${startDate} - ${endDate}`;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`Project update added! \n${reportString}\n`);

                // Visa rapporten
                setShowReport(true);
                //*********************       ^^^^^^^ GJORT FRÅN TimeReportAddConfirmation^^^^^^^                 ********************** */
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
                <h1>Current project and timespan</h1>
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
                                {" -- "}
                                {project.properties.Status.select.name}
                            </p>
                            {" -- "}
                            <p>
                                {" "}
                                Current Timespan:{" "}
                                {project.properties.Timespan.date ? (
                                    <>
                                        {project.properties.Timespan.date.start}{" "}
                                        - {project.properties.Timespan.date.end}
                                    </>
                                ) : (
                                    "No date"
                                )}
                            </p>
                        </option>
                    ))}
                </select>
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
