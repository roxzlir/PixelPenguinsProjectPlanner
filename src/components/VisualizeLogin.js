import React, { useState, useEffect } from "react";
import axios from "axios";

export default function VisualizeLogin({ onLogin }) {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    // Läs inloggad användare från localStorage vid komponentens montering
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    // Funktion för att hantera inloggning
    const handleLogin = () => {
        const user = users.find((user) => user.username === selectedUser);

        if (user && user.id.toString() === password) {
            setLoggedInUser(selectedUser);
            localStorage.setItem("loggedInUser", selectedUser); // Spara inloggad användare i localStorage
            onLogin(selectedUser); // Anropa förälderkomponentens onLogin-funktion
        } else {
            alert("Fel användarnamn eller lösenord!");
        }
    };

    // Funktion för att hämta användardata från API
    const fetchData = () => {
        axios
            .post("http://localhost:3001/api/notion/people")
            .then((response) => {
                const usersData = response.data.results.map((item) => ({
                    username: item.properties.Name.title[0]?.plain_text,
                    id: item.properties.ID.unique_id.number,
                }));
                setUsers(usersData);
            })
            .catch((error) => {
                console.log("Fel vid hämtning av användardata:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            style={{
                textAlign: "center",
                backgroundColor: "pink",
                padding: "20px",
            }}
        >
            <h1 style={{ textAlign: "center" }}>Inloggning</h1>
            <p>
                VisualizeLogin component, när inloggat visualiseras logga ut
                knappen
            </p>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <select
                    onChange={(e) => setSelectedUser(e.target.value)}
                    value={selectedUser}
                >
                    <option value="">Välj användare</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginLeft: "10px" }}
                />
                <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
                    Logga in
                </button>
            </div>
            {loggedInUser && (
                <button
                    onClick={() => {
                        setLoggedInUser("");
                        localStorage.removeItem("loggedInUser"); // Ta bort inloggad användare från localStorage
                    }}
                    style={{ marginLeft: "10px" }}
                >
                    Logga ut
                </button>
            )}
            <p style={{ textAlign: "center" }}>
                {loggedInUser
                    ? `Inloggad som: ${loggedInUser}`
                    : "Ingen användare är inloggad."}
            </p>
        </div>
    );
}

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import { useHistory } from "react-router-dom";     //  OM vi använder Hasroute ist för browser för att omdiriegera dom till rätt sida..**********************

// // OM INLOGGD = EMPLYEE  =>  EMPLOYEE SIDA.. LÄS LÄNGST NER OM DETTA

// // LÖSEN
// // Dominic Ement = 1
// // Penny Tool = 2
// // Justin Case = 3
// // Jhon Doe = 4
// // Fig Nelson = 5
// // Test Testsson = 8
// // Angelica = 9

// export default function VisualizeLogin({ onLogin }) {
//     // State, hantera den inloggade användaren
//     // const history = useHistory();         -----------------------------       //  OM vi använder Hasroute ist för browser för att omdiriegera dom till rätt sida..****************
//     /* Visa inloggad användare om det finns */
//     const [loggedInUser, setLoggedInUser] = useState(null);
//     // State, hantera det valda användarnamnet
//     const [selectedUser, setSelectedUser] = useState("");
//     // State, hantera lösenordet
//     const [password, setPassword] = useState("");
//     // State, hantera listan över användare
//     const [users, setUsers] = useState([]);

//     // För att hämta data vid komponentens montering
//     useEffect(() => {
//         fetchData();
//     }, []);

//     //Funktion, hämta användardata från en API
//     const fetchData = () => {
//         axios
//             .post("http://localhost:3001/api/notion/people")
//             .then((response) => {
//                 // Extrahera användardata från API-svar och uppdatera state
//                 const usersData = response.data.results.map((item) => ({
//                     username: item.properties.Name.title[0]?.plain_text,
//                     id: item.properties.ID.unique_id.number, // sparar bara siffran som lösen nu (ej PPPP)
//                 }));
//                 setUsers(usersData);
//                 console.log("Användardata hämtad:", usersData);
//             })
//             .catch((error) => {
//                 // Hantera fel vid hämtning av data
//                 console.log("Fel vid hämtning av användardata:", error);
//             });
//     };

//     // Funktion för hantera inloggning
//     const handleLogin = () => {
//         // Hitta användaren med det valda användarnamnet
//         const user = users.find((user) => user.username === selectedUser);

//         // Kontrollera om användaren och lösenordet matchar
//         if (user && user.id.toString() === password) {
//             // Uppdatera state för inloggad användare
//             setLoggedInUser(user.username);
//             onLogin();
//         } else {
//             // Visa felmeddelande vid felaktigt användarnamn eller lösenord popupAlert
//             alert("Fel användarnamn eller lösenord!");
//         }
//     };

//     //   Om du använder HashRouter istället för BrowserRouter, så är konceptet fortfarande detsamma.                                                    ***********************
//     //   Du kan använda Route-komponenten för att definiera olika vägar och vilka komponenter som ska renderas för varje väg.
//     //   Sedan, efter att användaren har loggat in och deras roll har verifierats, kan du använda history.push() för att omdirigera dem till rätt väg baserat på deras roll.
//     //   Här är ett exempel på hur du kan implementera detta med HashRouter:

//     //   const handleLogin = () => {    -----------------------------               OMDIRIGERA DIREKT EFTER INLOGG använder history..?? plus push till nästa sida..****************
//     //   // Logik för inloggning...
//     //   if (/* inloggning lyckades */) {
//     //     setLoggedInUser(selectedUser); // Sätt inloggad användare

//     //     // Omdirigera användaren beroende på deras roll
//     //     if (/* användaren är en anställd */) {
//     //       history.push("/employee"); // Omdirigera till sidan för anställda
//     //     } else if (/* användaren är en projektledare */) {
//     //       history.push("/project-manager"); // Omdirigera till sidan för projektledare
//     //     }
//     //   } else {
//     //     alert("Fel användarnamn eller lösenord!");
//     //   }
//     // };

//     // Funktion för att hantera utloggning
//     const handleLogout = () => {
//         // Nollställ den inloggade användaren och formulärfält
//         setLoggedInUser(null);
//         setSelectedUser("");
//         setPassword("");
//     };

//     return (
//         <div
//             style={{
//                 textAlign: "center",
//                 backgroundColor: "pink",
//                 padding: "20px",
//             }}
//         >
//             {/* Rubrik för inloggning */}
//             <h1 style={{ textAlign: "center" }}>Inloggning</h1>
//             {/* Beskrivning av komponenten */}
//             <p>
//                 VisualizeLogin component, när inloggat visualiseras logga ut
//                 knappen
//             </p>
//             {/* Formulär för inloggning */}
//             <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                 {/* Rullista med användarnamn */}
//                 <select
//                     onChange={(e) => setSelectedUser(e.target.value)}
//                     value={selectedUser}
//                 >
//                     <option value="">Välj användare</option>
//                     {/* Generera listan över användarnamn från användardata */}
//                     {users.map((user, index) => (
//                         <option key={index} value={user.username}>
//                             {user.username}
//                         </option>
//                     ))}
//                 </select>
//                 {/* Input för lösenord */}
//                 <input
//                     type="password"
//                     placeholder="Lösenord"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     style={{ marginLeft: "10px" }}
//                 />
//                 {/* Knapp för att logga in */}
//                 <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
//                     Logga in
//                 </button>
//             </div>
//             {/* Knapp för logg ut, visas endast om en användare är inloggad */}
//             {loggedInUser && (
//                 <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
//                     Logga ut
//                 </button>
//             )}
//             {/* Visa inloggad användare om det finns */}
//             <p style={{ textAlign: "center" }}>
//                 {loggedInUser
//                     ? `Inloggad som: ${loggedInUser}`
//                     : "Ingen användare är inloggad."}
//             </p>
//         </div>
//     );
// }

// //**********************************************************************************************/
// // HÅRDKODAT
// //**********************************************************************************************/

// // import
// //**********************************************************************************************/
// // NÄSTA STEG FÖRFLYTTA ANVÅÄNDARE TILL ANVÄNDARSIDAN
// //**********************************************************************************************/

// // !!!! när nu användaren loggat in så är den på min startsida, HUR förflyttar man användaren till en ny sida?

// // !!!! vilka steg behöver göras ?

// // För att förflytta användaren till en ny sida i en React-applikation kan du följa dessa steg:

// // Installera react-router-dom: Om du inte redan har gjort det, installera react-router-dom genom att köra npm install react-router-dom i terminalen. Detta paket ger dig möjlighet att hantera navigering i en React-applikation.

// // Skapa nya komponenter för sidorna: Skapa komponenter som representerar de olika sidorna i din applikation. Till exempel kan du ha en komponent för startsidan, en för inloggningssidan och så vidare.

// // Konfigurera routning: Definiera routning för dina olika sidor. Detta görs vanligtvis i rotkomponenten i din applikation. Du använder BrowserRouter, Switch och Route-komponenter från react-router-dom för att göra detta.

// // Skapa länkar eller knappar för navigering: På startsidan eller där du vill att användaren ska kunna navigera till andra sidor, lägg till länkar eller knappar som använder Link-komponenten från react-router-dom.

// // Hantera autentisering och privata rutter: Om vissa sidor kräver autentisering, se till att du hanterar detta korrekt. Det kan innebära att du skapar en högre ordningskomponent för privata rutter som kontrollerar om användaren är inloggad innan de tillåts att komma åt en viss sida.

// // Testa din navigering: När allt är konfigurerat, testa att navigera mellan olika sidor i din applikation för att säkerställa att allt fungerar som förväntat.

// // Här är ett exempel på hur din rotkomponent kan se ut med routning:

// // jsx
// // Copy code
// // import React from 'react';
// // import { BrowserRouter, Route, Switch } from 'react-router-dom';
// // import Home from './Home'; // Importera din startsida
// // import LoginPage from './LoginPage'; // Importera din inloggningssida

// // const App = () => {
// //   return (
// //     <BrowserRouter>
// //       <Switch>
// //         <Route exact path="/" component={Home} /> {/* Startsida */}
// //         <Route path="/login" component={LoginPage} /> {/* Inloggningssida */}
// //         {/* Lägg till fler Route-komponenter för andra sidor */}
// //       </Switch>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // Med denna konfiguration, när användaren besöker /-sökvägen i applikationen, kommer de att dirigeras till startsidan. Om de går till /login, kommer de att dirigeras till inloggningssidan. Du kan lägga till fler sidor och definiera deras routning på samma sätt.

// //////////////////////////////////////////////////////////////////

// // !!!!!!!!!! när dom loggat in vill jag att dom skickas till resp sida beroende på om dom är employee eller ProjectMaganger

// //För att göra detta, kan du följa dessa steg:

// // Identifiera användartypen vid inloggning: När användaren loggar in måste du på något sätt identifiera om de är en anställd (worker) eller en projektledare (project manager). Detta kan göras genom att till exempel kontrollera användaruppgifterna mot en databas eller någon annan typ av autentiseringsmetod.

// // Lagra användartypen: När användaren har loggat in och du har identifierat deras användartyp, måste du lagra denna information på ett tillförlitligt sätt. Du kan använda tillståndshantering i din applikation, till exempel useState tillsammans med useContext eller en global tillståndsbehållare som Redux, för att lagra användartypen.

// // Omledning till rätt sida: Efter att användartypen har identifierats och lagrats, måste du sedan omdirigera användaren till rätt sida baserat på deras användartyp. Detta kan göras med hjälp av en router som react-router-dom. Du kan använda en omdirigeringskomponent som Redirect eller useHistory-hooket för att leda användaren till den korrekta sidan.

// // Här är ett exempel på hur du kan implementera detta med react-router-dom:

// // jsx
// // Copy code
// // import React, { useState } from 'react';
// // import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
// // import LoginPage from './LoginPage';
// // import WorkerPage from './WorkerPage';
// // import ProjectManagerPage from './ProjectManagerPage';

// // const App = () => {
// //   // Anta att användartypen är 'worker' eller 'project manager'
// //   const [userType, setUserType] = useState(null);

// //   return (
// //     <BrowserRouter>
// //       <Switch>
// //         <Route exact path="/">
// //           <LoginPage setUserType={setUserType} />
// //         </Route>
// //         <Route path="/worker">
// //           {userType === 'worker' ? <WorkerPage /> : <Redirect to="/" />}
// //         </Route>
// //         <Route path="/project-manager">
// //           {userType === 'project manager' ? <ProjectManagerPage /> : <Redirect to="/" />}
// //         </Route>
// //       </Switch>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // I detta exempel, efter att användaren har loggat in och userType har ställts in, kommer de att omdirigeras till antingen WorkerPage eller ProjectManagerPage baserat på deras användartyp. Om userType inte är satt eller inte är en giltig användartyp, kommer de att omdirigeras till startsidan (LoginPage).
