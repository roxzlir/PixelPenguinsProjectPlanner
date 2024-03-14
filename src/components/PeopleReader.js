import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PeopleReader.css";

export default function PeopleReader() {
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

    // const matchLoggedUser = (loggedInName) => {
    //     if (data && data.results) {
    //         const person = data.results.find((item) => {
    //             return (
    //                 item.properties.Name.title[0].plain_text === loggedInName
    //             );
    //         });

    //         setSingelPerson(person);
    //         console.log("HÄR ÄR DATAN SOM FINNS I PERSON:", person);
    //     }
    // };

    // const hardUserName = "Test Testsson";
    // matchLoggedUser(logOutLoggedInUser());

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Laddar data / ingen data att visa...</p>;
    }
    return (
        <div>
            <h1>
                Inloggad som:{" "}
                {singlePerson &&
                    singlePerson.properties.Name.title[0].plain_text}
            </h1>
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
                <h2>Inloggade användarens data:</h2>
                {singlePerson && ( // Kontrollera att singlePerson är definierad
                    <ul>
                        <li>
                            <p>
                                Namn:{" "}
                                {
                                    singlePerson.properties.Name.title[0]
                                        .plain_text
                                }
                            </p>
                            <p>
                                Total hours:{" "}
                                {
                                    singlePerson.properties["Total hours"]
                                        .rollup.number
                                }
                            </p>
                        </li>
                    </ul>
                )}
            </main>
        </div>
    );
}
