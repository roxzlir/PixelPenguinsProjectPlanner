// AuthComponent.js
import React, { useEffect } from "react";
import axios from "axios";

const AuthVerify = ({ children }) => {
    useEffect(() => {
        const authenticateUser = async () => {
            try {
                // Kolla om användaren redan är inloggad
                const accessToken = localStorage.getItem("access_token");
                if (!accessToken) {
                    // Om inte, skicka till inloggningssidan
                    window.location.href = "/login";
                    return;
                }

                // Skicka en förfrågan till backend för att verifiera token
                const response = await axios.post("/verifyToken", {
                    accessToken,
                });
                if (response.data.validToken) {
                    // Token är giltigt, fortsätt till huvudapplikationen
                    return;
                } else {
                    // Token ogiltigt, skicka till inloggningssidan
                    window.location.href = "/login";
                }
                console.log(accessToken);
            } catch (error) {
                console.error("Error verifying token:", error);
                // Om något går fel, skicka till inloggningssidan
                window.location.href = "/login";
            }
        };

        authenticateUser();
    }, []);

    return <>{children}</>;
};

export default AuthVerify;
