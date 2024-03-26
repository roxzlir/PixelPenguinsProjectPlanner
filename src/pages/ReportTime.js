import React from "react";
import AddTimereport from "../components/AddTimereport";
import LogTimereport from "../components/LogTimereport";
import { RoleAuth } from "../components/RoleAuth";
import LoggedInTimereports from "../components/LoggedInTimereports";
import "../css/ReportTime.css";

export default function ReportTime() {
    const userRole = localStorage.getItem("userRole");

    return (
        <div className="ReportTime-container">
            <div>
                <h1>
                    Here you can report time on the project you have been
                    working on
                </h1>
                {userRole === "Employee" && (
                    <React.Fragment>
                        <LogTimereport />
                    </React.Fragment>
                )}

                <br />
            </div>
            <div>
                <br />
                <p>
                    Here the project manager can add a report on every employee:
                </p>
                {userRole === "Teamleader" ||
                    (userRole === "CEO" && (
                        <React.Fragment>
                            <AddTimereport />
                        </React.Fragment>
                    ))}
                <br />
            </div>
            <br />
        </div>
    );

    // return (
    //     <div className="parent">
    //         <div className="div1">
    //             <h1>Report Time</h1>

    //             <p>Only the logged in Employee's Report Time function</p>
    //             {loginProcess && <LogTimereport />}

    //             <br />
    //         </div>
    //         <div className="div2">
    //             <br />
    //             <p>
    //                 Here the project manager can add a report on every employee:
    //             </p>
    //             {/* <LoggedInTimereports /> */}
    //             {loginProcess && <AddTimereport />}
    //             <br />
    //         </div>
    //         <br />
    //     </div>
    // );
}
