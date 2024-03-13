import React, { useState } from "react";
import axios from "axios";

// Angelica och Carro
// gjorde lägga till ett popupwindow med bekräftelse
// som endast syns när en rapport blivit sparad och
// datan som skrivits in sparats i en sträng
// med hjälp av koden vi fick av Emil när vi var på lärarcentrum

export default function TimeReportAddComfirmation() {
  // State för att hantera formulärdata
  const [reportData, setReportData] = useState({
    addDate: new Date(),
    hours: 0,
    note: "Code",
    // Nu blir "Code" standardvärde för note. Flera relationer kan läggas till, såsom person eller projekt.
  });

  // State för att hantera synligheten av rapporten
  const [showReport, setShowReport] = useState(false);

  // Funktion för att hantera ändringar i formulärfält
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "addDate" ? new Date(value) : value;
    setReportData({
      ...reportData,
      [name]: newValue,
    });
  };

  // Funktion för att hantera formulärINskick
  const handleSubmit = (e) => {
    e.preventDefault();
    const reportDataCopy = {
      ...reportData,
      hours: parseInt(reportData.hours),
    };

    axios
      .post("http://localhost:3004/api/add-report", reportDataCopy)
      .then((response) => {
        // Vid lyckad förfrågan
        console.log("Report added successfully:", response.data);

        // Sträng som representerar timmrapporten som fylls i
        const reportString = `
          Timmar: ${reportData.hours}
          Datum: ${reportData.addDate.toISOString().substr(0, 10)}
          Ämne: ${reportData.note}
        `;

        // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
        alert(`${reportString}\n\nRapporten har lagts till.`);

        // Visa rapporten
        setShowReport(true);
      })
      .catch((error) => {
        // Vid fel
        console.error("Error adding report:", error);
        // Visa popupfönster med felmeddelande
        alert("Ett fel uppstod vid tillägg av rapporten.");
      });
  };

  return (
    <div>
      {!showReport && ( // Visa formuläret endast om showReport är falsk
        <form onSubmit={handleSubmit}>
          <label>
            Timmar:
            <input
              type="number"
              name="hours"
              value={reportData.hours}
              onChange={handleInputChange}
              // hantera formulärinskick
            />
          </label>
          <label>
            Datum:
            <input
              type="date"
              name="addDate"
              value={reportData.addDate.toISOString().substr(0, 10)}
              onChange={handleInputChange}
              // hantera formulärinskick
            />
          </label>
          <label>
            Ämne:
            <input
              type="text"
              name="note"
              value={reportData.note}
              onChange={handleInputChange}
              // hantera formulärinskick
            />
          </label>
          <button type="submit">Lägg till</button>
        </form>
      )}
    </div>
  );
}
