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
      .post("http://localhost:3004/api/notion/people", payload)
      .then((response) => {
        console.log("Datan vi hämtar från People-databasen: ", response.data);

        // Byt ut 'desiredName' mot det namn vi vill söka efter och personen som ska displayas
        const desiredName = "John Doe";
        const desiredPerson = response.data.results.find(
          // Använd find för att leta igenom
          (item) => item.properties.Name.title[0]?.plain_text === desiredName
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
        <p>Namn: {person.properties.Name.title[0]?.plain_text || "N/A"}</p>
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
          Adress: {person.properties.Address.rich_text[0]?.plain_text || "N/A"}
        </p>
        <p>ID: {person.properties.ID.unique_id.number || "no"}</p>
      </main>
    </div>
  );
}

// SKIT I DET NEDAN

/*********************************************************************************************/
//  SÖKA EFTER SPECIFIKT ID OCH DISPLAYA DET                         //
/*********************************************************************************************/

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PeopleReader.css";

// export default function PeopleReader() {
//   const [person, setPerson] = useState(null);

//   const fetchData = () => {
//     const payload = {};

//     axios
//       .post("http://localhost:3004/api/notion/people", payload)
//       .then((response) => {
//         console.log("Datan vi hämtar från People-databasen: ", response.data);
//         // Här kan byter vi ut 'desiredId' mot det ID du vill hämta
//         const desiredId = "7480d012-0c0e-4a70-a2b1-23bf05ccbe86";
//         const desiredPerson = response.data.results.find(
//           (item) => item.object.id === desiredId
//         );
//         setPerson(desiredPerson);
//         console.log("idet vi söker med: ", desiredId);
//         console.log("desiredPerson via id: ", desiredPerson);
//       })
//       .catch((error) => {
//         console.log(
//           "Fel inträffade vid hämtningen från People-databasen: ",
//           error
//         );
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   if (!person) {
//     return <p>Laddar data / personen kunde inte hittas...</p>;
//   }

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>
//         Information om person med ID: {person.object.id}
//       </h1>
//       <main className="Person-info">
//         <p>Namn: {person.properties.Name.title[0].plain_text || "N/A"}</p>
//         <p>Ålder: {person.properties.Age.number || "N/A"}</p>
//         <p>
//           Totala timmar:{" "}
//           {person.properties["Total hours"].rollup.number || "N/A"}
//         </p>
//         <p>
//           Telefonnummer:{" "}
//           {person.properties["Phone Number"].phone_number || "N/A"}
//         </p>
//         <p>Lön: {person.properties.Salary.number || "N/A"}</p>
//         <p>
//           Adress: {person.properties.Address.rich_text[0].plain_text || "N/A"}
//         </p>
//       </main>
//     </div>
//   );
// }

/*********************************************************************************************/
//                                                                                           //
/*********************************************************************************************/

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function UsersVisualize() {
//   const [users, setUsers] = useState([]);
//   const pageId = "bbf40074-be90-40ea-b979-d6c3379168dd"; // Sidans ID (people => page)?

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     // Axios för att göra ett GET-anrop till Notions API för att hämta användarinformation
//     axios
//       .get(`http://localhost:3004/api/notion/pages/${pageId}`)
//       .then((response) => {
//         // Extrahera användarinformationen från svaret
//         const userData = response.data;
//         // Uppdatera komponentens state med användarinformationen
//         setUsers([userData]);
//       })
//       .catch((error) => {
//         console.log("Error while fetching users:", error);
//       });
//   };

//   if (!users || users.length === 0) {
//     return <p>Laddar data... ingen data att visa</p>;
//   }

//   return (
//     <div>
//       <h1>All Users</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             <p>
//               <strong>Name:</strong> {user.properties.Name.title[0].plain_text}
//             </p>
//             <p>
//               <strong>Address:</strong>{" "}
//               {user.properties.Address.rich_text[0].plain_text}
//             </p>
//             <p>
//               <strong>Age:</strong> {user.properties.Age.number}
//             </p>
//             <p>
//               <strong>Phone Number:</strong>{" "}
//               {user.properties["Phone Number"].phone_number}
//             </p>
//             <p>
//               <strong>Salary:</strong> {user.properties.Salary.number}
//             </p>
//             <p>
//               <strong>Total Hours:</strong>{" "}
//               {user.properties["Total hours"].rollup.number}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

/*
Retrieve a page property item
GET
https://api.notion.com/v1/pages/{page_id}/properties/{property_id}

Retrieves a property_item object for a given page_id and property_id. Depending on the property type, the object returned will either be a value or a paginated list of property item values. See Property item objects for specifics.

To obtain property_id's, use the Retrieve a database endpoint.

In cases where a property item has more than 25 references, this endpoint should be used, rather than Retrieve a page. (Retrieve a page will not return a complete list when the list exceeds 25 references.)

********************************************
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  const pageId = 'b55c9c91-384d-452b-81db-d1ef79372b75';
  const propertyId = "aBcD123
  const response = await notion.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });
  console.log(response);
})();


*/
