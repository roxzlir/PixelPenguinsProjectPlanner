import React, { useState } from "react";
import axios from "axios";
import "../css/ProjectInputEdit.css";

export default function TimereportDateEdit({ selectedReport, onClose }) {
    const [newDate, setNewDate] = useState("");

    const handleNewDate = (event) => {
        setNewDate(event.target.value);
    };

    const handleDateUpdate = async (e) => {
        e.preventDefault();
        if (!selectedReport || !newDate) {
            alert("Please fill all fields");
            return;
        }
        const updateDate = {
            pageId: selectedReport.id,
            updateDate: newDate,
        };

        axios
            .patch(
                "http://localhost:3001/api/update-timereport-date",
                updateDate
            )
            .then((response) => {
                const reportString = `From date: ${selectedReport.properties.Date.date.start} to new date: ${newDate}`;
                alert(`Timereport date is now updated! \n${reportString}\n`);
                onClose(); // Stänger komponenten när datumet har uppdaterats
            })
            .catch((error) => {
                console.log(
                    "Something went wrong with update to server: ",
                    error
                );
            });
    };

    return (
        <div className="page-container">
            <main className="display-section">
                <section>
                    <h2>
                        Would you like to change this date{" "}
                        {selectedReport.properties["Date"] &&
                            selectedReport.properties["Date"].date &&
                            selectedReport.properties["Date"].date.start}
                        :
                    </h2>
                    <label>
                        Please add new date:
                        <input
                            className="PIE-input"
                            type="date"
                            value={newDate}
                            onChange={handleNewDate}
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
                </section>
            </main>
        </div>
    );
}
