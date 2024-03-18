/*********************************************************************************************/
//                       KOMPONENT FÖR VISUALISERING AV SPECIFIK PERSON                        //
/*********************************************************************************************/
import React, { useState, useEffect } from "react";
import axios from "axios";

// ENDAST VISUALISERING / DISPLAY AV EN PERSON UTEFTER NAMN NU DÅ...
// kanske kan slänga in dropdownlistan.. kan ska ju användas när anv är inloggad så onödigt?

export default function UserVisualize() {
    // State för att lagra den specifika personen
    const [person, setPerson] = useState(null);

    // Funktion för att hämta data för en specifik person
    const fetchData = () => {
        const payload = {};

    axios
      .post("http://localhost:3001/api/notion/people", payload)
      .then((response) => {
        console.log("Datan vi hämtar från People-databasen: ", response.data);


                // Byt ut 'desiredName' mot det namn vi vill söka efter och personen som ska displayas
                const desiredName = "John Doe";
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
        <div style={{ textAlign: "center", backgroundColor: "yellow" }}>
            <h1 style={{ textAlign: "center" }}>
                Information om person med namn:{" "}
                {person.properties.Name.title[0]?.plain_text}
            </h1>
            <main className="Person-info">
                <p>
                    Namn: {person.properties.Name.title[0]?.plain_text || "N/A"}
                </p>
                <p>Ålder: {person.properties.Age.number || "N/A"}</p>
                <p>
                    Totala timmar:{" "}
                    {person.properties["Total hours"].rollup.number || "N/A"}
                </p>
                <p>
                    Telefonnummer:{" "}
                    {person.properties["Phone Number"].phone_number || "N/A"}
                </p>
                <p>Lön: {person.properties.Salary.number || "N/A"}</p>
                <p>
                    Adress:{" "}
                    {person.properties.Address.rich_text[0]?.plain_text ||
                        "N/A"}
                </p>
                <p>ID: {person.properties.ID.unique_id.number || "no"}</p>
            </main>
        </div>
    );
}
