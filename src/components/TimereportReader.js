import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TimereportReader.css";

export default function TimereportReader() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});

    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion/timereports", payload)
            .then((response) => {
                setData(response.data);
                console.log(
                    "Datan vi hämtar från Timereports-databasen: ",
                    response.data
                );

                const peopleIds = response.data.results
                    .map((item) => {
                        return item.properties["Person"]?.relation?.map(
                            (person) => person.id
                        );
                    })
                    .flat();

                fetchPeopleData(peopleIds);
            })
            .catch((error) => {
                console.log(
                    "Fel inträffade vid hämtningen från Timereports-databasen: ",
                    error
                );
            });

        const fetchPeopleData = (peopleIds) => {
            // Skicka förfrågan för att hämta information om personer
            axios
                .post("http://localhost:3001/api/notion/people", {
                    ids: peopleIds,
                })
                .then((response) => {
                    setPeopleData(response.data);
                    console.log(
                        "Datan vi hämtar från People-databasen: ",
                        response.data
                    );
                })

                .catch((error) => {
                    console.log(
                        "Fel inträffade vid hämtning av PERSON ID MOT PEOPLE: ",
                        error
                    );
                });
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Laddar data / ingen data att visa...</p>;
    }
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>
                All data från Timereport databasen i vår Notion:
            </h1>
            {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            <main className="Timereport-list">
                <ul>
                    {data.results.map((item) => (
                        <li key={item.id}>
                            <p>
                                Date: {""}
                                {item.properties["Date"] &&
                                    item.properties["Date"].date &&
                                    item.properties["Date"].date.start}
                            </p>
                            {item.properties["Person"]?.relation?.map(
                                (person) => (
                                    <p key={person.id}>
                                        Person:{" "}
                                        {peopleData[person.id]?.properties.Name
                                            .title[0].plain_text || "Unknown"}
                                    </p>
                                )
                            )}{" "}
                            {item.properties["Note"].title.map((item) => (
                                <p key={item.plain_text}>
                                    Note: {item.plain_text}
                                </p>
                            ))}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
