import React from "react";
import "./middisplay.css"
import old_book from "./images/old_book.webp"

const MidDisplay = () => {
    return (
        <div className="mid-display">
            <div className="mid-display-container">
                <div className="left-side">
                    <div className="container">
                        <h4>"Health is the greatest possession."</h4>
                        <p>Lao Tzu</p>
                    </div>
                </div>
                <div className="right-side">
                    <img src={old_book} alt="old book" />
                </div>
            </div>
        </div>
    );
};

export default MidDisplay;
