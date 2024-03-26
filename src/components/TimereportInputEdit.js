import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimereportReader.css";

export default function TimereportInputEdit() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});
    const [projectData, setProjectData] = useState({});
    const [selectedReport, setSelectedReport] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [showReport, setShowReport] = useState(false);

    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion/timereports", payload)
            .then((response) => {
                setData(response.data);

                fetchPeopleData();
                fetchProjectData();
            })
            .catch((error) => {
                console.log(
                    "Error occurred while fetching data from Timereports database: ",
                    error
                );
            });

        const fetchPeopleData = () => {
            axios
                .post("http://localhost:3001/api/notion/people")
                .then((response) => {
                    const people = {};
                    response.data.results.forEach((person) => {
                        const properties = person.properties || {};
                        const name =
                            properties["Name"]?.title?.[0]?.plain_text ||
                            "Unknown";
                        people[person.id] = { id: person.id, name };
                    });
                    setPeopleData(people);
                    console.log("HÄR ÄR PEOPLE: ", people);
                })
                .catch((error) => {
                    console.log(
                        "Error occurred while fetching data about people:",
                        error
                    );
                });
        };
        // Funktion för att hämta projektdata från en extern källa
        const fetchProjectData = () => {
            // Anropar en API-endpoint för att hämta projektdata
            axios.post("http://localhost:3001/api/notion").then((response) => {
                // Skapar ett tomt objekt för att lagra projektnamn och deras tillhörande ID
                const projects = {};
                // Loopar igenom varje resultat i API-svaret
                response.data.results.forEach((item) => {
                    // Hämtar egenskaperna för varje projekt, eller om det inte finns några egenskaper, sätts det till ett tomt objekt
                    const properties = item.properties || {};
                    // Hämtar projektnamnet från egenskaperna, om det finns, eller sätter det till "Unknown" om det inte finns något namn
                    const projectName =
                        properties["Projectname"]?.title?.[0]?.plain_text ||
                        "Unknown";
                    // Lägger till projektets ID och namn i projects-objektet, där ID används som nyckel
                    projects[item.id] = { id: item.id, projectName };
                });
                // Uppdaterar state med den hämtade projektdata
                setProjectData(projects);
            });
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSelectedReport = (event) => {
        const selectedId = event.target.value;
        const selectedReport = data.results.find(
            (item) => item.id === selectedId
        );
        setSelectedReport(selectedReport);
    };

    const handleNewDate = (event) => {
        setNewDate(event.target.value);
    };

    const handleDateUpdate = async (e) => {
        e.preventDefault();
        if (!selectedReport || !newDate) {
            console.log("Alla fält måste vara ifyllda!");
            return;
        }
        const updateDate = {
            pageId: selectedReport.id,
            updateDate: newDate,
        };
        console.log("Detta skickas till servern: ", updateDate);
        axios
            .patch(
                "http://localhost:3001/api/update-timereport-date",
                updateDate
            )
            .then((response) => {
                console.log("Uppdatering LYCKADES!! ", response.data);
                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `From date: ${selectedReport.properties.Date.date.start} to new date: ${newDate}`;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`Timereport date is now updated! \n${reportString}\n`);

                // Visa rapporten
                setShowReport(true);
                //*********************       ^^^^^^^ GJORT FRÅN TimeReportAddConfirmation^^^^^^^                 ********************** */
            })

            .catch((error) => {
                console.log("Något fel med patch via servern: ", error);
            });
    };

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }
    data.results.sort((a, b) => {
        const nameA = a.properties["Person"]?.relation?.[0]?.id;
        const nameB = b.properties["Person"]?.relation?.[0]?.id;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    const sortedData = [...data.results].sort((a, b) => {
        const dateA = new Date(a.properties["Date"]?.date?.start);
        const dateB = new Date(b.properties["Date"]?.date?.start);
        return dateA - dateB;
    });

    console.log("Här är projectData", projectData);

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Change date on a timereport:
            </h1>
            <main className="Timereport-list">
                <select
                    name="selectedReport"
                    onChange={handleSelectedReport}
                    value={selectedReport?.id}
                >
                    <option value="">Select a report</option>
                    {/* //vill vi sortera med namn kör vi data.results.map som
                    vanligt */}
                    {sortedData.map((item) => (
                        <option
                            value={item.id}
                            className="TIE-link"
                            style={{
                                backgroundColor: "yellow",
                                border: "2px solid black",
                            }}
                            key={item.id}
                        >
                            <p>
                                Date:{" "}
                                {item.properties["Date"] &&
                                    item.properties["Date"].date &&
                                    item.properties["Date"].date.start}
                            </p>{" "}
                            {item.properties["Person"]?.relation?.map(
                                (person) => (
                                    <p key={person.id}>
                                        Person:{" "}
                                        {peopleData[person.id]?.name
                                            ? peopleData[person.id].name
                                            : "Unknown"}
                                    </p>
                                )
                            )}{" "}
                            {item.properties["Project"]?.relation?.map(
                                (project) => (
                                    // Skapar en paragraf för varje projekt
                                    <p key={project.id}>
                                        {/* Visar "Project: " som text */}
                                        Project:{" "}
                                        {/* Om det finns projektnamn kopplat till det aktuella projekt-ID:et i projectData, visas projektnamnet */}
                                        {projectData[project.id]?.projectName
                                            ? // Om det finns projektnamn, används det för att visa projektnamnet
                                              projectData[project.id]
                                                  .projectName
                                            : // Om inget projektnamn finns, visas "Unknown"
                                              "Unknown"}
                                    </p>
                                )
                            )}{" "}
                            {item.properties["Note"].title.map((note) => (
                                <p key={note.plain_text}>
                                    Note: {note.plain_text}
                                </p>
                            ))}
                        </option>
                    ))}
                </select>
                {selectedReport && (
                    <div>
                        <h2>
                            Update date for Timereport{" "}
                            {selectedReport.properties["Date"] &&
                                selectedReport.properties["Date"].date &&
                                selectedReport.properties["Date"].date.start}
                            :
                        </h2>
                        <label>
                            New date:
                            <input
                                type="date"
                                value={newDate}
                                onChange={handleNewDate}
                            />
                        </label>
                        <button onClick={handleDateUpdate}>Update date</button>
                    </div>
                )}
            </main>
        </div>
    );
}
