import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TimereportReader() {
    const [data, setData] = useState(null);
    const [peopleData, setPeopleData] = useState({});
    const [projectData, setProjectData] = useState({});
    const [selectedPersonId, setSelectedPersonId] = useState("");
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const timereportsResponse = await axios.post("http://localhost:3001/api/notion/timereports");
                setData(timereportsResponse.data);

                const peopleResponse = await axios.post("http://localhost:3001/api/notion/people");
                const people = {};
                peopleResponse.data.results.forEach((person) => {
                    const properties = person.properties || {};
                    const name = properties["Name"]?.title?.[0]?.plain_text || "Unknown";
                    people[person.id] = { id: person.id, name };
                });
                setPeopleData(people);

                const projectsResponse = await axios.post("http://localhost:3001/api/notion");
                const projects = {};
                projectsResponse.data.results.forEach((project) => {
                    const properties = project.properties || {};
                    const projectName = properties["Projectname"]?.title?.[0]?.plain_text || "Unknown";
                    projects[project.id] = { id: project.id, name: projectName };
                });
                setProjectData(projects);
            } catch (error) {
                console.log("Error occurred while fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const filterTimereportsByPersonAndDateRange = (personId, startDate, endDate) => {
        if (!data) return [];
        return data.results.filter((report) => {
            const reportDate = new Date(report.properties.Date.date.start);
            const isPersonMatch = report.properties.Person.relation.some((person) => person.id === personId);
            
            // Extract date parts from reportDate, startDate, and endDate
            const reportDateOnly = new Date(reportDate.getFullYear(), reportDate.getMonth(), reportDate.getDate());
            const startDateOnly = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()) : null;
            const endDateOnly = endDate ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) : null;
            
            // Compare only the date parts
            const isStartDateMatch = !startDateOnly || reportDateOnly >= startDateOnly;
            const isEndDateMatch = !endDateOnly || reportDateOnly <= endDateOnly;
            
            return isPersonMatch && isStartDateMatch && isEndDateMatch;
        });
    };
    

    const handleSelectChange = (e, setter) => {
        setter(e.target.value);
    };

    return (
        <div>
            <label>Select a person:</label>
            <select value={selectedPersonId} onChange={(e) => handleSelectChange(e, setSelectedPersonId)}>
                <option value="">All</option>
                {Object.keys(peopleData).map((personId) => (
                    <option key={personId} value={personId}>
                        {peopleData[personId].name}
                    </option>
                ))}
            </select>

            <label>Choose date range:</label>
            <div>
                <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    selectsStart
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    placeholderText="Start Date"
                />
                <DatePicker
                    selected={selectedEndDate}
                    onChange={(date) => setSelectedEndDate(date)}
                    selectsEnd
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    minDate={selectedStartDate}
                    placeholderText="End Date"
                />
            </div>

            {selectedPersonId && (
                <div>
                    <h2>{peopleData[selectedPersonId].name}'s Timereports:</h2>
                    {filterTimereportsByPersonAndDateRange(selectedPersonId, selectedStartDate, selectedEndDate).length > 0 ? (
                        <ul>
                            {filterTimereportsByPersonAndDateRange(selectedPersonId, selectedStartDate, selectedEndDate).map((report) => (
                                <li key={report.id}>
                                    <p>Date: {report.properties.Date.date.start}</p>
                                    <p>Hours: {report.properties.Hours.number}</p>
                                    <p>Project: {projectData[report.properties.Project.relation[0].id]?.name || "Unknown"}</p>
                                    <p>Note: {report.properties.Note.title[0]?.plain_text || "No note"}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No timereports found for {peopleData[selectedPersonId].name}</p>
                    )}
                </div>
            )}
        </div>
    );
}
