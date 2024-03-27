import React, { useState, useEffect } from "react";
import axios from "axios";

function TimereportReader() {
    const [timereports, setTimereports] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [people, setPeople] = useState([]);
    const [projects, setProjects] = useState({});
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [timereportsResponse, peopleResponse] = await Promise.all([
                axios.post("http://localhost:3001/api/notion/timereports"),
                axios.post("http://localhost:3001/api/notion/people"),
            ]);

            setTimereports(timereportsResponse.data.results);

            // Extracting and formatting people data
            const formattedPeople = peopleResponse.data.results.map(
                (person) => ({
                    id: person.id,
                    name:
                        person.properties.Name.title[0]?.text?.content ||
                        "Unknown",
                })
            );
            setPeople(formattedPeople);

            const [projectsResponse] = await Promise.all([
                axios.post("http://localhost:3001/api/notion"),
            ]);

            const formattedProjects = projectsResponse.data.results.reduce(
                (acc, project) => {
                    acc[project.id] =
                        project.properties.Projectname.title[0]?.text
                            ?.content || "Unknown";
                    return acc;
                },
                {}
            );
            setProjects(formattedProjects);
        } catch (error) {
            console.log("Error occurred while fetching data:", error);
        }
    }

    function filterTimereports() {
        return timereports.filter((report) => {
            const reportDate = new Date(report.properties.Date.date.start);
            const isPersonMatch =
                !selectedPerson ||
                report.properties.Person.relation.some(
                    (person) => person.id === selectedPerson
                );
            const isDateRangeMatch =
                (!startDate || new Date(reportDate) >= new Date(startDate)) &&
                (!endDate || new Date(reportDate) <= new Date(endDate));

            return isPersonMatch && isDateRangeMatch;
        });
    }

    return (
        <div className="page-container">
            <div className="display-section">
                <label>Select a person:</label>
                <select
                    className="PIE-select"
                    value={selectedPerson}
                    onChange={(e) => setSelectedPerson(e.target.value)}
                >
                    <option value="">All</option>
                    {people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>

                <label>Choose date range:</label>
                <input
                    className="PIE-input"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    className="PIE-input"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />

                <div className="card-list">
                    {filterTimereports().map((report) => (
                        <div key={report.id} className="card">
                            <p>Date: {report.properties.Date.date.start}</p>
                            <p>Hours: {report.properties.Hours.number}</p>
                            <p>
                                Project:{" "}
                                {projects[
                                    report.properties.Project.relation[0].id
                                ] || "Unknown"}
                            </p>
                            <p>
                                Note:{" "}
                                {report.properties.Note?.title?.[0]
                                    ?.plain_text || "No note"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TimereportReader;
