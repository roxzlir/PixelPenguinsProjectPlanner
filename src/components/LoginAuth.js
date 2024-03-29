import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/LoginAuth.css";

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

        if (user && user.id.toString() === password) {
            setLoggedInUser(selectedUser);
            localStorage.setItem("loggedInUser", selectedUser); // Spara inloggad användare i localStorage
            localStorage.setItem("userRole", loggedInRole);
            localStorage.setItem("loggedInId", loggedInId);
            navigate("/");

            window.location.reload();
        } else {
            alert("Wrong password for this user!");
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
                setUsers(usersData);
            })
            .catch((error) => {
                console.log(
                    "Something went wrong when collectiong data from notion: ",
                    error
                );
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="LoginAuth-container">
            <main className="LA-display-section">
                <h1>Welcome</h1>
                <p>
                    {loggedInUser
                        ? "Have a nice day!"
                        : "Please select your name and enter password"}
                </p>

                <select
                    className="LA-select"
                    onChange={(e) => setSelectedUser(e.target.value)}
                    value={selectedUser}
                >
                    <option value="">Choose user</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <input
                    className="LA-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="standard-btn2" onClick={handleLogin}>
                    Login
                </button>
                <p>
                    {loggedInUser
                        ? `Logged in as: ${loggedInUser}`
                        : "No user is logged in."}
                </p>
            </main>
        </div>
    );
}
