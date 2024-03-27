import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function LoginAuth() {
    // // LÖSEN
    // // Dominic Ement = 123456
    // // Penny Tool = 654321
    // // Justin Case = 111111
    // // Jhon Doe = 222222
    // // Fig Nelson = 333333
    // // Test Testsson = 999999
    // // Angelica = 888888

    const [loggedInUser, setLoggedInUser] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Läs inloggad användare från localStorage vid komponentens montering
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    const handleLogin = () => {
        const user = users.find((user) => user.username === selectedUser);
        const loggedInRole = users.find(
            (item) => item.username === selectedUser
        )?.role;
        const loggedInId = users.find(
            (item) => item.username === selectedUser
        )?.pageID;

        console.log("Detta finns i userRole: ", loggedInRole);
        console.log("Detta finns i loggedInId: ", loggedInId);
        if (user && user.id.toString() === password) {
            setLoggedInUser(selectedUser);
            localStorage.setItem("loggedInUser", selectedUser); // Spara inloggad användare i localStorage
            localStorage.setItem("userRole", loggedInRole);
            localStorage.setItem("loggedInId", loggedInId);
            navigate("/");

            window.location.reload();
        } else {
            alert("Fel användarnamn eller lösenord!");
        }
    };

    // Funktion för att hämta användardata från API item.properties.ID.unique_id.number
    const fetchData = () => {
        axios
            .post("http://localhost:3001/api/notion/people")
            .then((response) => {
                const usersData = response.data.results.map((item) => ({
                    username: item.properties.Name.title[0]?.plain_text,
                    id: item.properties.Password.rich_text[0]?.text.content,
                    role: item.properties.Role.select.name,
                    pageID: item.id,
                }));
                console.log(
                    "Detta är sparat i usersData: ",
                    usersData,
                    usersData.id
                );
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
        <div className="page-container">
            <main className="display-section">
                <h1 style={{ textAlign: "center" }}>Welcome</h1>
                <p>
                    VisualizeLogin component, när inloggat visualiseras logga ut
                    knappen
                </p>

                <select
                    className="PIE-select"
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
                    className="PIE-input"
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // style={{ marginLeft: "10px" }}
                />
                <br />
                <button
                    className="standard-btn2"
                    onClick={handleLogin}
                    // style={{ marginLeft: "10px" }}
                >
                    Logga in
                </button>

                {loggedInUser && (
                    <button
                        className="standard-btn2"
                        onClick={() => {
                            setLoggedInUser("");
                            localStorage.removeItem("loggedInUser"); // Ta bort inloggad användare från localStorage
                        }}
                    >
                        Logga ut
                    </button>
                )}
                <p style={{ textAlign: "center" }}>
                    {loggedInUser
                        ? `Inloggad som: ${loggedInUser}`
                        : "Ingen användare är inloggad."}
                </p>
            </main>
        </div>
    );
}
