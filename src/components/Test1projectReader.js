import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Test1projectReader() {
    const [data, setData] = useState(null);

    const FetchData = () => {
        const payload = {};

        axios
            .get("http://localhost:3001/api/notion/test1", payload)
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
        <div>
            <h1>All data från Test1 PAGE's ID i vår Notion:</h1>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
