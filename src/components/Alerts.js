import React, { useState, useEffect, useRef } from "react";
import "../css/Alerts.css";
import axios from "axios";

export default function Alert({ onSelectProject }) {
    const [data, setData] = useState(null);
    const [todayDate] = useState(new Date()); // Todays date
    const [alertResults, setAlertResults] = useState([]); // State to save / set Alertresults
    const alertDataRef = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3001/api/notion"
                );
                setData(response.data);
            } catch (error) {
                console.log("Wrong while fetching data from Notion: ", error);
            }
        };

        fetchData();
    }, []);

    //******************* IF less then 10 days to startUP *******************
    const alertDaysUntilStart = () => {
        if (!data || !Array.isArray(data.results)) return null;

        const alerts = data.results.map((alertData) => {
            const endDateEnd = alertData.properties.Timespan.date.end;
            const startDate = new Date(
                alertData.properties.Timespan.date.start
            );
            const startDateDifference =
                startDate.getTime() - todayDate.getTime();
            const daysToStart = Math.ceil(
                startDateDifference / (1000 * 3600 * 24)
            );
            const projectName =
                alertData.properties.Projectname.title[0].text.content;
            const activeProject = alertData.properties.Status.select.name;
            const startDateDate = alertData.properties.Timespan.date.start;

            //If next Up & terms days to start
            if (
                activeProject === "Next Up" &&
                daysToStart >= 0 &&
                daysToStart < 10
            ) {
                // data to ref-object
                alertDataRef.current.push({
                    type: "alertDaysUntilStart",
                    projectName: projectName,
                    daysToStart: daysToStart,
                    startDate: startDateDate,
                    endDate: endDateEnd,
                });
                return (
                    <section className="Alert-section">
                        <h3 style={{ color: "red" }}>
                            WARNING! <br />
                            NEXT UP - Less than 10 days to startup
                        </h3>
                        <li className="Alert-li" key={alertData.id}>
                            <h2>Project: {projectName}</h2>
                            Days until start : {daysToStart} <br />
                            Start date project : {startDateDate} <br />
                            End date project : {endDateEnd} <br />
                            ------------------------------------------
                            <p>Make the changes needed</p>
                        </li>
                    </section>
                );
            }
            return null;
        });

        setAlertResults(alerts); // Uppdate setAlertResults with alerts
    };

    // *******************If less then 10 h left in project*******************
    const alertHours = () => {
        if (!data || !Array.isArray(data.results)) return null;

        const alerts = data.results.map((alertData) => {
            const endDate = new Date(alertData.properties.Timespan.date.end);
            const hoursLeft = alertData.properties["Hours left"].formula.number;
            const projectName =
                alertData.properties.Projectname.title[0].text.content;
            const activeProject = alertData.properties.Status.select.name;
            const startDateDate = new Date(
                alertData.properties.Timespan.date.start
            );
            // if one of the terms is right
            if (
                (activeProject === "Active" &&
                    hoursLeft >= 0 &&
                    hoursLeft <= 10) ||
                (activeProject === "Next up" &&
                    hoursLeft >= 0 &&
                    hoursLeft <= 10)
            ) {
                return (
                    //return
                    <section className="Alert-section">
                        <li className="Alert-li" key={alertData.id}>
                            <h3 style={{ color: "red" }}>
                                WARNING!
                                <br /> Less than 10 hours left in project
                            </h3>
                            <h2>
                                Project: {projectName} <br />
                            </h2>
                            Status : {activeProject} <br />
                            Hours left: {hoursLeft} <br />
                            Start date: {startDateDate.toDateString()} <br />
                            End date: {endDate.toDateString()} <br />
                            ------------------------------------------
                            <p>Make the changes needed</p>
                        </li>
                    </section>
                );
            }

            return null; // Return null if not
        });

        setAlertResults(alerts); // Update state setAlertResults with alert results
    };

    // *******************IF more Hours left vs/ workdays til end date 8h/workday*******************
    const alertHoursDays = () => {
        if (!data || !Array.isArray(data.results)) return null;

        let alerts = []; // Definie alerts as let

        alerts = data.results.map((alertData) => {
            // mapping results
            const endDate = new Date(alertData.properties.Timespan.date.end);
            const daysLeft = Math.ceil(
                (endDate - todayDate) / (1000 * 3600 * 24)
            ); // so we can see Days left until endDate

            // If endDate is after today date reurn null
            if (endDate < todayDate) return null;

            const projectName =
                alertData.properties.Projectname.title[0].text.content;
            const activeProject = alertData.properties.Status.select.name;
            const hoursLeft = alertData.properties["Hours left"].formula.number;
            const workHoursPerDay = 8; // 8 h / workday
            const neededWorkDays = hoursLeft / workHoursPerDay; // calculate needed workdays

            //if Active & daysleft id less than needed workdays
            if (activeProject === "Active" && daysLeft < neededWorkDays) {
                return (
                    <section className="Alert-section">
                        <li className="Alert-li" key={alertData.id}>
                            <h3 style={{ color: "red" }}>
                                WARNING! <br /> {activeProject} project has more
                                hours left than workdays until End-Date
                            </h3>
                            <h2>
                                Project name: {projectName} <br />
                            </h2>
                            Days left until endDate: {daysLeft} <br />
                            Needed work days: {neededWorkDays} <br />
                            Hours left: {hoursLeft} <br /> <br />
                            Todays date: {todayDate.toDateString()} <br />
                            End date project: {endDate.toDateString()} <br />
                            ------------------------------------------
                            <p>Make the changes needed</p>
                        </li>
                    </section>
                );
            }

            return null; // Return null if not
        });

        setAlertResults(alerts); // Update setAlertResults state with alertresult
    };

    //*******************If less than 48 h to end date*******************
    const alertTwoDayEnd = () => {
        if (!data || !Array.isArray(data.results)) return null;

        let alerts = []; // Definie alerts

        data.results.forEach((alertData) => {
            const endDate = new Date(alertData.properties.Timespan.date.end);
            const daysLeft = Math.ceil(
                (endDate - todayDate) / (1000 * 3600 * 24)
            ); // days to endDate

            // if enddate is in the feature, return null
            if (endDate < todayDate) return null;

            const projectName =
                alertData.properties.Projectname.title[0].text.content;
            const activeProject = alertData.properties.Status.select.name;

            // If active & days left less than 2
            if (activeProject === "Active" && daysLeft < 2) {
                alerts.push(
                    <section className="Alert-section">
                        <li className="Alert-li" key={alertData.id}>
                            <br />
                            <h3 style={{ color: "red" }}>
                                WARNING! <br /> {activeProject} project has less
                                than 48 hours to endDate
                            </h3>
                            <h2>
                                Project: {projectName} <br />
                            </h2>
                            Todays date: {todayDate.toDateString()} <br />
                            Days left until endDate: {daysLeft} <br />
                            End date for this project: {endDate.toDateString()}{" "}
                            <br />
                            ------------------------------------------
                            <p>Make the changes needed</p>
                        </li>
                    </section>
                );
            }
        });

        setAlertResults(alerts); // Update setAlertResults state with alertresult
    };

    // *******************If END DATE PASSED*******************
    const alertEndDate = () => {
        if (!data || !Array.isArray(data.results)) return null;

        let alerts = []; // Definie alerts as let

        data.results.forEach((alertData) => {
            const projectName =
                alertData.properties.Projectname.title[0].text.content;
            const activeProject = alertData.properties.Status.select.name;
            const endDate = new Date(alertData.properties.Timespan.date.end);

            // count the difference between endDate & today date in millisec
            let passedDays = endDate.getTime() - todayDate.getTime();

            // Convert passedDays from millisec to days
            passedDays = Math.ceil(passedDays / (1000 * 3600 * 24));

            // If enddate is after Todays date return null( enddate havent passed)
            if (endDate > todayDate) return null;

            // (else enddate passed) if Active
            if (activeProject === "Active") {
                alerts.push(
                    <section className="Alert-section">
                        <li className="Alert-li" key={alertData.id}>
                            <h3 style={{ color: "red" }}>
                                WARNING! <br /> {activeProject} project,
                                End-Date PASSED
                            </h3>
                            <h2>
                                {projectName} <br />
                            </h2>
                            Todays date: {todayDate.toDateString()} <br />
                            End date: {endDate.toDateString()} <br />
                            Passed by {passedDays} days
                            <br />
                            ------------------------------------------
                            <p>Make the changes needed</p>
                        </li>
                    </section>
                );
            }
        });

        setAlertResults(alerts); // Update setAlertResults state with alertresult
    };

    // ************************************************************
    // Button color based on whether there are alert results or not
    const checkAlertResult = setAlertResults.length > 0 ? "red" : "default";

    return (
        <section className="Alert-container">
            <main className="Alert-box">
                <h2>Project Alerts</h2>
                <h3>TODAY DATE: {todayDate.toDateString()}</h3>
                <p>DoubleClick to see warnings</p>

                {/* 10 Days to startup, Next up project (not Active yet) */}
                <button
                    className="Alert-B"
                    onDoubleClick={alertDaysUntilStart} // starts alertfunction on doubleClick
                    onMouseDown={() => setAlertResults([])} // reset setalertResults onMouseDown(no visualize)
                    style={{ backgroundColor: checkAlertResult }} // if data red button
                >
                    (10 Days to StartUp)
                </button>

                {/* less then 10 h left Active projekt*/}
                <button
                    className="Alert-B"
                    onDoubleClick={alertHours} // starts alertfunction on doubleClick
                    onMouseDown={() => setAlertResults([])} // reset setalertResults onMouseDown(no visualize)
                    style={{ backgroundColor: checkAlertResult }} // if data red button
                >
                    (Less then 10 Hours left)
                </button>

                {/* more Hours left vs/ workdays til end date */}
                <button
                    className="Alert-B"
                    onDoubleClick={alertHoursDays} // starts alertfunction on doubleClick
                    onMouseDown={() => setAlertResults([])} // reset setalertResults onMouseDown(no visualize)
                    style={{ backgroundColor: checkAlertResult }} // if data red button
                >
                    (Active Date & Time)
                </button>

                {/* less then 48 h left to end date Active */}
                <button
                    className="Alert-B"
                    onDoubleClick={alertTwoDayEnd} // starts alertfunction on doubleClick
                    onMouseDown={() => setAlertResults([])} // reset setalertResults onMouseDown(no visualize)
                    style={{ backgroundColor: checkAlertResult }} // if data red button
                >
                    (Less than 48h EndDate)
                </button>

                {/* end date passed Active */}
                <button
                    className="Alert-B"
                    onDoubleClick={alertEndDate} // starts alertfunction on doubleClick
                    onMouseDown={() => setAlertResults([])} // reset setalertResults onMouseDown
                    style={{ backgroundColor: checkAlertResult }} // if data red button
                >
                    (ACTIVE EndDate PASSED!!)
                </button>

                {alertResults}
            </main>
        </section>
    );
}
