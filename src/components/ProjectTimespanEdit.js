import React, { useState } from "react";
import axios from "axios";
import "../css/ProjectInputEdit.css";

const ProjectTimespanEdit = ({ selectedProject, onClose }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleDateUpdate = async (e) => {
        e.preventDefault();

        if (!selectedProject || !startDate || !endDate) {
            alert("All fields need to be selected.");
            return;
        }

        const updateData = {
            projectId: selectedProject.id,
            startDate: startDate,
            endDate: endDate,
        };

        axios
            .patch("http://localhost:3001/api/update-project", updateData)
            .then((response) => {
                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `Project: ${selectedProject.properties.Projectname.title[0].plain_text} with previous timespan: ${selectedProject.properties.Timespan.date.start} - ${selectedProject.properties.Timespan.date.end} has now been updated with dates: ${startDate} - ${endDate}`;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`Project update added! \n${reportString}\n`);
            })
            .catch((error) => {
                console.log("Update didn't post to server: ", error);
            });
    };

    return (
        <div className="page-container">
            <section className="display-section">
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
                            className="PIE-input"
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </label>
                    <label>
                        End Date:
                        <input
                            className="PIE-input"
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </label>
                    <section className="action-section">
                        <button
                            className="standard-btn3"
                            onClick={handleDateUpdate}
                        >
                            Save
                        </button>
                        <button className="standard-btn3" onClick={onClose}>
                            Close
                        </button>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default ProjectTimespanEdit;
