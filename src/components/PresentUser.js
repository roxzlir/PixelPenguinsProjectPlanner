import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PresentUser() {
    const [data, setData] = useState([]);
    const [singlePerson, setSingelPerson] = useState(null);

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
    const fromLocalStorage = () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        console.log("VAD SOM LIGGER I LOCALSTORAGE: ", loggedInUser);
        return loggedInUser;
    };

    useEffect(() => {
        const loggedInUser = fromLocalStorage();
        if (data && data.results) {
            const person = data.results.find((item) => {
                return (
                    item.properties.Name.title[0].plain_text === loggedInUser
                );
            });

            setSingelPerson(person);
        }
    }, [data]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <h1>
            Inloggad som:{" "}
            {singlePerson && singlePerson.properties.Name.title[0].plain_text}
        </h1>
    );
}
