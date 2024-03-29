import React from "react";
import Pingu from "../images/pinguLogo.png";

import "../css/Logo.css";

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={Pingu} alt="penguin-logo" style={{ width: "10%" }} />
            <h1>PixelPenguins Project Planner</h1>
        </div>
    );
}
