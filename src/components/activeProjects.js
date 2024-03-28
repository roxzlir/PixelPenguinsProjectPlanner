import React, { useState, useEffect } from "react";
import axios from "axios";

function ActiveProjects() {
    const [data, setData] = useState(null);
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchData = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/notion"
            );
            setData(response.data);
            console.log("Data fetched from Notion: ", response.data);
        } catch (error) {
            console.log("Error occurred while fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data || !Array.isArray(data?.results)) {
        return <p>Loading data / No data to display...</p>;
    }

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const filteredProjects = data.results.filter((item) => {
        if (statusFilter === "All") {
            return true;
        } else {
            return item.properties.Status.select.name === statusFilter;
        }
    });

    return (
            <div className="page-container">     
                        <div className="display-section">    
                        <thead>
   
            <h1 style={{ textAlign: "center" }}>Active projects</h1>
            
                <label htmlFor="statusFilter">Filter by status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Next up">Next up</option>
                    <option value="Done">Done</option>
                </select>
                </thead>
                </div>
            
                <div className="table-container">
                <table className="timereport-table">
                <tbody>
                <tr>
                    {filteredProjects.map((item) => (
                        <tr key={item.id}>
                            <td>
                                Projectname:{" "}
                                {
                                    item.properties.Projectname.title[0]
                                        .plain_text
                                }
                            </td>
                            <td>Hours: {item.properties.Hours.number}</td>
                            <td>
                                Hours left:{" "}
                                {item.properties["Hours left"].formula.number}
                            </td>
                            <td>
                                Worked hours:{" "}
                                {item.properties["Worked hours"].rollup.number}
                            </td>
                            <td>Status: {item.properties.Status.select.name}</td>
                            <td>
                                Timespan:{" "}
                                {item.properties.Timespan.date ? (
                                    <>
                                        {item.properties.Timespan.date.start} -{" "}
                                        {item.properties.Timespan.date.end}
                                    </>
                                ) : (
                                    "No date"
                                )}
                            </td>
                        </tr>
                        
                    ))}
                </tr>
                </tbody>
                </table>
        </div>
        </div>
    );
}

export default ActiveProjects;
