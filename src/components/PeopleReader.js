import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PeopleReader.css";



// Test
export default function PeopleReader() {
    const [data, setData] = useState(null);

    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion/people", payload)
            .then((response) => {
                setData(response.data);
                console.log(
                    "Datan vi hämtar från People-databasen: ",
                    response.data
                );
            })
            .catch((error) => {
                console.log(
                    "Fel inträffade vid hämtningen från People-databasen: ",
                    error
                );
            });
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
                All data från PEOPLE databasen i vår Notion:
            </h1>
            {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
            <main className="People-list">
                <ul> 
                    {data.results.map((item) => (
                        <li key={item.id}>
                            {""}
                            <p>
                                Namn: {""}
                                {item.properties.Name.title[0].plain_text}
                            </p>
                            <p>
                                Total hours: {""}
                                {item.properties["Total hours"].rollup.number}
                            </p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
