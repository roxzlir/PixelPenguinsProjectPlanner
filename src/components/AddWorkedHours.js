import React, { useState } from "react";
import axios from "axios";

const AddWorkedHours = ({ itemId }) => {
    const [workedHours, setWorkedHours] = useState("");

    const handleWorkedHoursChange = (event) => {
        setWorkedHours(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3001/api/update-worked-hours",
                { itemId, workedHours }
            );

            console.log("Worked hours updated:", response.data);

            // Om du vill uppdatera gränssnittet efter att du har uppdaterat Worked Hours
            // kan du göra en ny förfrågan till din Notion API för att hämta den uppdaterade datan
            // eller så kan du bara visa en bekräftelse för användaren att uppdateringen lyckades.
        } catch (error) {
            console.error("Error updating worked hours:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Worked Hours:
                <input
                    type="number"
                    value={workedHours}
                    onChange={handleWorkedHoursChange}
                />
            </label>
            <button type="submit">Save</button>
        </form>
    );
};

export default AddWorkedHours;
