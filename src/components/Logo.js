import React from "react";
import Icon from "../images/settings-icon.png";
import "../css/Logo.css";

export default function Logo() {
    return (
        <div className="logo-container">
            <img src={Icon} alt="icon-logo" style={{ width: "10%" }} />
            <h1>PixelPenguins Project Planner</h1>
        </div>
    );
}
