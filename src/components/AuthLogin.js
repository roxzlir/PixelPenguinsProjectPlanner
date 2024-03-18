import { useEffect } from "react";
import axios from "axios";

const oauth_client_id = "17e634d7-db48-4d7b-b479-eb33f46751d2";

function AuthLogin() {
    const fetchData = (code) => {
        const payload = { code }; // Skapa ett objekt med koden att skicka till servern

        axios
            .post("http://localhost:3001/login", payload)
            .then((response) => {
                // Om förfrågan är framgångsrik och du får tillbaka åtkomsttoken
                const { access_token } = response.data;
                localStorage.setItem("access_token", access_token); // Spara åtkomsttoken i localStorage
                // Gör något mer med åtkomsttoken här om det behövs
                window.location.href = "/ReportTime"; // Navigera till huvudappen när användaren är inloggad
            })
            .catch((error) => {
                // Hantera fel om något går fel under POST-förfrågan
                console.error("Error fetching access token:", error);
            });
    };

    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get("code");
        if (code) {
            fetchData(code); // Anropa fetchData-funktionen med den erhållna koden
        }
    }, []);

    useEffect(() => {
        // Om vi har en access token i local storage, antar vi att användaren redan är inloggad
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            // Användaren är inloggad, navigera till huvudappen
            window.location.href = "/ReportTime"; // eller var ditt dashboard är
        }
    }, []);

    const handleLoginClick = () => {
        // Navigera användaren till Notions autentiseringsflöde när de klickar på knappen
        window.location.href = `https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`;
    };

    return (
        <div>
            <p>Klicka på knappen nedan för att logga in med Notion:</p>
            <button onClick={handleLoginClick} className="login-button">
                Logga in med Notion
            </button>
        </div>
    );
}

export default AuthLogin;

// // Den här koden är för att hantera autentisering med Notion. Autentisering är processen för att kontrollera att användare är vem de säger att de är.

// // useState och useEffect är funktioner från React som låter oss hantera tillstånd och göra saker när komponenten laddas eller uppdateras.

// // oauth_client_id är ett unikt ID för vår applikation, som Notion använder för att känna igen den när vi försöker ansluta.

// // AuthLogin är en React-komponent som hanterar autentisering.

// // I useEffect-funktionen, när vår komponent laddas, letar den efter en "code" i webbadressen (URL).
// // Om den hittar en kod betyder det att användaren just har loggat in på Notion och har blivit omdirigerad tillbaka till vår sida.
// // Vi använder den koden för att begära autentisering från vår backend, vilket låter oss få åtkomst till användarens data.

// // fetch-funktionen gör en förfrågan till vår backend (lokalt i detta fall) för att begära autentisering med den kod som vi fått från Notion.
// // Vi väntar på svar och uppdaterar sedan vårt tillstånd med den information vi får tillbaka.

// // return-delen av komponenten renderar en länk ("Connect to Notion") som användare kan klicka på för att logga in på Notion.
// // När de loggar in och omdirigeras tillbaka till vår sida, visas informationen om de databaser(dbs) de har åtkomst till.

// // Sammanfattningsvis: Denna kod hanterar processen för att logga in på Notion från vår applikation och få åtkomst till användarens data.
// // När användaren loggar in och återvänder till vår sida, visar den vilka databaser de har åtkomst till från Notion.

// // The OAuth client ID from the integration page!
// const oauth_client_id = "17e634d7-db48-4d7b-b479-eb33f46751d2";

// function AuthLogin() {
//     const [dbs, setdbs] = useState([]);

//     // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.

//     useEffect(() => {
//         const params = new URL(window.document.location).searchParams;
//         const code = params.get("code");
//         if (!code) return;
//         fetch(`http://localhost:3001/login/${code}`).then(async (resp) => {
//             setdbs(await resp.json());
//             localStorage.setItem("access_token", data.access_token); // Lagra tokenkoden i local storage
//         });
//     }, []);

//     return (
//         <div>
//             <a
//                 style={{ display: "block" }}
//                 href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
//             >
//                 Connect to Notion
//             </a>
//             {dbs.map((db) => (
//                 <div
//                     style={{
//                         display: "inline-flex",
//                         whiteSpace: "pre",
//                         border: "1px solid black",
//                         marginBottom: 10,
//                     }}
//                 >
//                     {JSON.stringify(db, null, 2)}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default AuthLogin;

// function AuthLogin() {
//     const [accessToken, setAccessToken] = useState(null);

//     useEffect(() => {
//         const params = new URL(window.document.location).searchParams;
//         const code = params.get("code");
//         if (!code) return;

//         fetch(`http://localhost:3001/login/${code}`)
//             .then(async (resp) => {
//                 const data = await resp.json();
//                 const token = data.access_token;
//                 setAccessToken(token);
//                 localStorage.setItem("access_token", token); // Lagra access token i local storage
//             })
//             .catch((error) => console.error("Error fetching data:", error));
//     }, []);

//     // Om användaren är inloggad (har access token) rendera resten av appen, annars rendera bara inloggningskomponenten
//     return accessToken ? <App /> : <div>Loading...</div>;
// }

// export default AuthLogin;
