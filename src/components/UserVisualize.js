/*********************************************************************************************/
//                       KOMPONENT FÖR VISUALISERING AV SPECIFIK PERSON                        //
/*********************************************************************************************/
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProjectInputEdit.css";

export default function UserVisualize() {
    // State för att lagra den specifika personen
    const [person, setPerson] = useState(null);

    // Funktion för att hämta data för en specifik person
    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion/people", payload)
            .then((response) => {
                console.log(
                    "Datan vi hämtar från People-databasen: ",
                    response.data
                );

                // Byt ut 'desiredName' mot det namn vi vill söka efter och personen som ska displayas
                const desiredName = localStorage.getItem("loggedInUser");
                const desiredPerson = response.data.results.find(
                    // Använd find för att leta igenom
                    (item) =>
                        item.properties.Name.title[0]?.plain_text ===
                        desiredName
                );
                setPerson(desiredPerson); // När hittad, sparas den i setPerson
            })

            .catch((error) => {
                console.log(
                    // Felmeddelande
                    "Fel inträffade vid hämtningen från People-databasen: ",
                    error
                );
            });
    };

    // Hämta data och sätt ihop
    useEffect(() => {
        fetchData();
    }, []);

    // Visa laddningsmeddelande person inte hittas
    if (!person) {
        return <p>Laddar data / personen kunde inte hittas...</p>;
    }

    return (
        <div className="page-container">
            <main className="display-section">
                <h1 style={{ textAlign: "center" }}>
                    Nice to see you again,{" "}
                    {person.properties.Name.title[0]?.plain_text}!
                </h1>
                <p>
                    Name: {person.properties.Name.title[0]?.plain_text || "N/A"}
                </p>
                <p>Age: {person.properties.Age.number || "N/A"}</p>
                <p>
                    Total amount of hours:{" "}
                    {person.properties["Total hours"].rollup.number || "N/A"}
                </p>
                <p>
                    Phone number:{" "}
                    {person.properties["Phone Number"].phone_number || "N/A"}
                </p>
                <p>Salary: {person.properties.Salary.number || "N/A"} kr </p>
                <p>
                    Address:{" "}
                    {person.properties.Address.rich_text[0]?.plain_text ||
                        "N/A"}
                </p>
                <p>ID: {person.properties.ID.unique_id.number || "no"}</p>
            </main>
        </div>
    );
}
