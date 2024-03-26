
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function LoginAuth() {
    // // LÖSEN
    // // Dominic Ement = 1
    // // Penny Tool = 2
    // // Justin Case = 3
    // // Jhon Doe = 4
    // // Fig Nelson = 5
    // // Test Testsson = 8
    // // Angelica = 9
 
    const [loggedInUser, setLoggedInUser] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const navigate = useNavigate();

    // Läs inloggad användare från localStorage vid komponentens montering
    useEffect(() => {
        const user = localStorage.getItem("loggedInUser");
        if (user) {
            setLoggedInUser(user);
        }
    }, []);
    // useEffect(() => {
    //     if (userRole) {
    //         localStorage.setItem("userRole", JSON.stringify(userRole));
    //     }
    // }, [userRole]);

    // Funktion för att hantera inloggning
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
            setUserRole(loggedInRole);
            localStorage.setItem("loggedInUser", selectedUser); // Spara inloggad användare i localStorage
            localStorage.setItem("userRole", loggedInRole);
            localStorage.setItem("loggedInId", loggedInId);
            navigate("/");

            window.location.reload();    

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
                    role: item.properties.Role.select.name,
                    pageID: item.id,
                }));
                console.log("Detta är sparat i usersData: ", usersData);
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