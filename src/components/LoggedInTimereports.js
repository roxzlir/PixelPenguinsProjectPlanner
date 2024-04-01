import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProjectInputEdit.css";

export default function LoggedInTimereports() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});
    const [projectData, setProjectData] = useState({});

    useEffect(() => {
        const fetchSingleTimereports = async () => {
            const requestBody = {
                loggedInId: localStorage.getItem("loggedInId"),
            };

            try {
                const response = await axios.post(
                    "http://localhost:3001/api/notion/timereport/loggedin",
                    requestBody,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                setData(response.data); // Uppdatera state med den hämtade datan
            } catch (error) {
                console.log(
                    "Something went wrong when collectiong data from notion: ",
                    error
                );
            }
        };

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
                })
                .catch((error) => {
                    console.log(
                        "Error occurred while fetching data about people:",
                        error
                    );
                });
        };

        const fetchProjectData = () => {
            axios.post("http://localhost:3001/api/notion").then((response) => {
                // Skapar ett tomt objekt för att lagra projektnamn och deras tillhörande ID
                const projects = {};
                // Loopar igenom varje resultat i API-svaret
                response.data.results.forEach((item) => {
                    // Hämtar egenskaperna för varje projekt, eller om det inte finns några egenskaper, sätts det till mitt tomma objekt
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

        fetchSingleTimereports();
        fetchPeopleData();
        fetchProjectData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }
    const sortedData = [...data.results].sort((a, b) => {
        const dateA = new Date(a.properties["Date"]?.date?.start);
        const dateB = new Date(b.properties["Date"]?.date?.start);
        return dateB - dateA;
    });

    return (
        <div className="page-container">
            <main className="display-section">
                <h3>Your previous reports</h3>
                <section className="table-container">
                    <table className="timereport-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Person</th>
                                <th>Project</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loopa genom varje timereport och skapa en rad i tabellen för varje */}
                            {sortedData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.properties["Date"] &&
                                            item.properties["Date"].date &&
                                            item.properties["Date"].date.start}
                                    </td>
                                    <td>
                                        {item.properties[
                                            "Person"
                                        ]?.relation?.map((person) => (
                                            <span key={person.id}>
                                                {peopleData[person.id]?.name}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {item.properties[
                                            "Project"
                                        ]?.relation?.map((project) => (
                                            <span key={project.id}>
                                                {projectData[project.id]
                                                    ?.projectName || "Unknown"}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        {item.properties["Note"].title.map(
                                            (note) => (
                                                <span key={note.plain_text}>
                                                    {note.plain_text}
                                                </span>
                                            )
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
