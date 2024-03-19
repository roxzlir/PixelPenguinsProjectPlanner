import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimereportReader.css";

export default function TimereportInputEdit() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});
    const [projectData, setProjectData] = useState({});

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
                const project = {};
                response.data.results.forEach((item) => {
                    const properties = item.properties || {};
                    const project =
                        properties["Projectname"]?.title?.[0]?.plain_text ||
                        "Unknown";
                    project[item.id] = { id: item.id, project };
                });
                setProjectData(project);
            });
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                All data from the Timereport database in our Notion:
            </h1>
            <main className="Timereport-list">
                <ul>
                    {data.results.map((item) => (
                        <li key={item.id}>
                            <p>
                                Date:{" "}
                                {item.properties["Date"] &&
                                    item.properties["Date"].date &&
                                    item.properties["Date"].date.start}
                            </p>
                            {item.properties["Person"]?.relation?.map(
                                (person) => (
                                    <p key={person.id}>
                                        Person:{" "}
                                        {peopleData[person.id]?.name
                                            ? peopleData[person.id].name
                                            : "Unknown"}
                                    </p>
                                )
                            )}

                            {item.properties["Project"]?.relation?.map(
                                (project) => (
                                    <p key={project.id}>
                                        Project:{" "}
                                        {projectData[project.id]?.name
                                            ? projectData[project.id].name
                                            : "Unknown"}
                                    </p>
                                )
                            )}

                            {item.properties["Note"].title.map((note) => (
                                <p key={note.plain_text}>
                                    Note: {note.plain_text}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
