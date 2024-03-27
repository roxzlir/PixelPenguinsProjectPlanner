import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoggedInTimereports() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});
    const [projectData, setProjectData] = useState({});
    const [allPeopleData, setAllPeopleData] = useState(null);

    useEffect(() => {
        const fetchSingleTimereports = async () => {
            const requestBody = {
                loggedInId: localStorage.getItem("loggedInId"),
            };
            console.log("Här är det som ligger i requestBody: ", requestBody);
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
                console.log("Fel vi fetchedSingel: ", error);
            }
        };

        const fetchPeopleData = () => {
            axios
                .post("http://localhost:3001/api/notion/people")
                .then((response) => {
                    const fetchedData = response.data;
                    setAllPeopleData(fetchedData);
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

        fetchSingleTimereports();
        fetchPeopleData();
        fetchProjectData();
    }, []); // Kör useEffect endast en gång vid mount

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                Change date on a timereport:
            </h1>
            <main className="Timereport-list">
                <select>
                    <option value="">Your previous reports</option>
                    {/* vill vi sortera med namn kör vi data.results.map som
                    vanligt */}
                    {data.results.map((item) => (
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
                                        Person: {peopleData[person.id]?.name}
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
            </main>
        </div>
    );
}
