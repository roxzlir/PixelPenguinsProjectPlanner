import React, { useState } from "react";
import axios from "axios";

const ProjectEditHours = ({ selectedProject, onClose }) => {
    const [updatedHours, setUpdatedHours] = useState("");

    const handleHoursChange = (event) => {
        setUpdatedHours(event.target.value);
    };

    const handleHoursUpdate = async (e) => {
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

        axios
            .patch("http://localhost:3001/api/update-project-hours", updateData)
            .then((response) => {
                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `Project: ${selectedProject.properties.Projectname.title[0].plain_text} with previous planned hours: ${selectedProject.properties.Hours.number} has now been updated to: ${updatedHours} hours`;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`Project update added! \n${reportString}\n`);
            })
            .catch((error) => {
                console.log("Update didn't post to server: ", error);
            });
    };

    return (
        <div className="page-container">
            <div className="display-section">
                {selectedProject && (
                    <div>
                        <h2>
                            or update hours for{" "}
                            {
                                selectedProject.properties.Projectname.title[0]
                                    .plain_text
                            }
                            :
                        </h2>
                        <label>
                            New number of hours:
                            <input
                                className="PIE-input"
                                type="number"
                                value={updatedHours}
                                onChange={handleHoursChange}
                            />
                        </label>
                        <section className="action-section">
                            <button
                                className="standard-btn3"
                                onClick={handleHoursUpdate}
                            >
                                Save
                            </button>
                            <button className="standard-btn3" onClick={onClose}>
                                Close
                            </button>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectEditHours;
