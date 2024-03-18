import React, { useState, useEffect } from "react";
import axios from "axios";
import NameList from "./NameList"; // Importera den nya komponenten

// Angelica Denna komponent ligger hos mig i DisplayPeople pages
// Denna är byggd med hjälp av NameList() ifrån NameList componenten
// NameList mappar alla användarnamn

export default function PeopleRullup() {
  const [data, setData] = useState(null); // State för att lagra hämtad/fetched data

  // Funktion för att hämta data från API Notion
  const fetchData = () => {
    const payload = {};

    axios
      .post("http://localhost:3001/api/notion/people", payload)
      .then((response) => {
        setData(response.data); // Spara datan i state
        console.log("Datan vi hämtar från People-databasen: ", response.data);
      })
      .catch((error) => {
        console.log(
          "Fel inträffade vid hämtningen från People-databasen: ",
          error
        );
      });
  };

  // Använd useEffect för att köra fetchData vid komponentens ihopsättning
  useEffect(() => {
    fetchData();
  }, []);

  // Om data inte finns eller inte är en array av resultat, visa laddningsmeddelande
  if (!data || !Array.isArray(data?.results)) {
    return <p>Laddar data / ingen data att visa...</p>;
  }

  // Om datan finns, rendera namnlistan
  return (
    <div style={{ backgroundColor: "lightblue", textAlign: "center" }}>
      <h1>PeopleRullup</h1>
      <h2>Alla Personer i databasen:</h2>
      {/* Visa namnlistan */}
      <NameList data={data.results} />
    </div>
  );
}
