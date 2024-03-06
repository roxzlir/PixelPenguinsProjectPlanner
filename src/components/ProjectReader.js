import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApiReader.css";

export default function ProjectReader() {
    const [data, setData] = useState(null);

    const FetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion", payload)
            .then((response) => {
                setData(response.data);
                console.log("Datan vi hämtar från Notion: ", response.data);
            })
            .catch((error) => {
                console.log(
                    "Fel inträffade vid hämtningen från Notion: ",
                    error
                );
            });
    };

    useEffect(() => {
        FetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Laddar data / ingen data att visa...</p>;
    }

    return (
        // <div>
        //     <h1>All data från PROJECT databasen i vår Notion:</h1>
        //     {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        // </div>
        <div>
            <h1 style={{ textAlign: "center" }}>
                All data från Project's databasens tabell
            </h1>
            <div className="ApiReader-container">
                <ul>
                    {/* Kör map och sätter döper eventet till item */}
                    {data.results.map((item) => (
                        <li key={item.id}>
                            {" "}
                            {/*Här måste man använda en key och ett värde för att kunna hantera alla
                sakerna varsinna unikt föremål liksom, så vi väljer item.id*/}
                            <p>
                                Projectname:{" "}
                                {/*Här måste vi använda properties eftersom dem finns i vår databas,
                            i övrigt så */}
                                {
                                    item.properties.Projectname.title[0]
                                        .plain_text
                                }
                            </p>
                            <p>Hours: {item.properties.Hours.number}</p>
                            <p>
                                Hours left:{" "}
                                {item.properties["Hours left"].formula.number}
                            </p>
                            <p>
                                Worked hours:{" "}
                                {item.properties["Worked hours"].rollup.number}
                            </p>
                            <p>Status: {item.properties.Status.select.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
