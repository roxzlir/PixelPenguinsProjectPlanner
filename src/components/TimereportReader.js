import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimereportReader.css";

export default function TimereportReader() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});

    const fetchData = () => {
        const payload = {};
        const userID = localStorage.getItem("loggedInId");
        console.log("userID: ", userID);
        axios
            .post("http://localhost:3001/api/notion/timereports", payload)
            .then((response) => {
                const filteredData = response.data.results.filter((item) => {
                    // Kontrollera om 'Person' relationen existerar och inte är null
                    if (
                        item.properties.Person &&
                        item.properties.Person.relation
                    ) {
                        return item.properties.Person.relation.some(
                            (person) => person.id === userID
                        );
                    }
                    return false; // Om 'Person' relationen saknas eller är null, exkludera denna post
                });
                setData(filteredData);
                fetchPeopleData();
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data.results)) {
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

                            {item.properties["Note"]?.title?.map((note) => (
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
