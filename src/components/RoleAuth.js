import { useState, useEffect } from "react";

export function RoleAuth() {
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const loggedInRole = localStorage.getItem("userRole");

        if (loggedInRole) {
            setUserRole(loggedInRole);
        }
    }, []);

    return userRole;
}
