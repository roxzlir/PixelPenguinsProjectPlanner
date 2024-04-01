import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/AddTimereport.css";

export default function AddTimereport() {
    //********************************************************* */
    //Här sätter jag upp det som har med PROJEKT ATT GÖRA
    //********************************************************* */
    const [projects, setProjects] = useState([]);
    //Denna vill jag spara ner alla namn som finns i Projectname

    const [projectData, setProjectData] = useState([]);
    //Denna vill jag spara ner ALL data från JSON svaret

    const FetchProjects = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion", payload)
            .then((response) => {
                const fetchedProjects = response.data;
                setProjectData(fetchedProjects); //Sätter svaret till projectData

                const projectNameList = fetchedProjects.results.map((item) => {
                    return item.properties.Projectname.title[0].plain_text; //Mappar ut Projectname
                });

                setProjects(projectNameList); //sätter mappade svaret till projects
            })
            .catch((error) => {
                console.log(
                    "Error when fetching data from Notion API: ",
                    error
                );
            });
    };

    //Funktionen för att leta fram vilket ID som tillhör ett namn

    const findProjectId = (projectName) => {
        if (projectData && projectData.results) {
            //Sätter en if sats för att se till att det finns data i projectData och även att det kommit in results från JSON
            const project = projectData.results.find((item) => {
                return (
                    item.properties.Projectname.title[0].plain_text ===
                    projectName
                ); //Mappar fram till namnen i JSON svaret och sätter att det ska vara samma som projectName (variabeln jag skickar med in i funktionen)
            });

            if (project) {
                //OM project nu har data, vill jag att fingProjctId funktionen retunerar project.id
                return project.id;
            }
        }
        return null;
    };
    //********************************************************* */
    //          Här kör jag allt för PEOPLE                     */
    //********************************************************* */

    const [names, setNames] = useState([]);
    const [peopleData, setPeopleData] = useState([]);

    const fetchData = () => {
        const payload = {};

        axios
            .post("http://localhost:3001/api/notion/people", payload)
            .then((response) => {
                const fetchedData = response.data;
                setPeopleData(fetchedData);
                const namesList = fetchedData.results.map((item) => {
                    return item.properties.Name.title[0].plain_text;
                });
                setNames(namesList);
            })
            .catch((error) => {
                console.log(
                    "Something went wrong when collectiong data from notion: ",
                    error
                );
            });
    };

    const findPersonId = (name) => {
        if (peopleData && peopleData.results) {
            const person = peopleData.results.find((item) => {
                return item.properties.Name.title[0].plain_text === name;
            });

            if (person) {
                return person.id;
            }
        }

        return null; // Return null if person not found or data is undefined
    };

    useEffect(() => {
        fetchData();
        FetchProjects();
    }, []);

    //************************************************** */
    const [reportData, setReportData] = useState({
        addDate: new Date(),
        hours: 0,
        note: "Code",
        selectedName: "",
        selectedProject: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === "addDate" ? new Date(value) : value;
        setReportData({
            ...reportData,
            [name]: newValue,
        });
    };

    const peopleID = findPersonId(reportData.selectedName);
    const projectID = findProjectId(reportData.selectedProject);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reportDataCopy = {
            ...reportData,
            hours: parseInt(reportData.hours),
            selectedName: peopleID,
            selectedProject: projectID,
        };

        axios
            .post("http://localhost:3001/api/add-report", reportDataCopy)
            .then((response) => {
                //*********************       HÄR LÄGGER JAG IN DET SOM ÄR GJORT FRÅN TimeReportAddConfirmation   ********************** */
                const reportString = `
          Hours: ${reportData.hours}
          Date: ${reportData.addDate}
          Note: ${reportData.note}
        `;

                // Visar strängen med datan ur timrapporten som rapporterats i popupfönster med bekräftelsemeddelande
                alert(`${reportString}\n\nReport have been added.`);
            })

            .catch((error) => {
                console.error("Error adding report:", error);
            });
    };

    return (
        <main className="A-T-container">
            <form className="A-T-form" onSubmit={handleSubmit}>
                <label>
                    Choose name:
                    <select
                        className="A-T-select"
                        name="selectedName"
                        value={reportData.selectedName}
                        onChange={handleInputChange}
                    >
                        {names.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Choose project:
                    <select
                        className="A-T-select"
                        name="selectedProject"
                        value={reportData.selectedProject}
                        onChange={handleInputChange}
                    >
                        {projects.map((projectname, index) => (
                            <option key={index} value={projectname}>
                                {projectname}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Hours:
                    <input
                        className="A-T-input"
                        type="number"
                        name="hours"
                        value={reportData.hours}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Date:
                    <input
                        className="A-T-input"
                        type="date"
                        name="addDate"
                        value={reportData.addDate.toISOString().substr(0, 10)}
                        // Konvertera datumet till ISO 8601-format för input-fältet
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Note:
                    <input
                        className="A-T-input"
                        type="text"
                        name="note"
                        value={reportData.note}
                        onChange={handleInputChange}
                    />
                </label>
                <button className="button-42" type="submit">
                    Register
                </button>
            </form>
        </main>
    );
}
