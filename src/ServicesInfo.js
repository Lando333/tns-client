import React from "react";
import "./services.css"
import acu_thumb2 from "./images/acu_thumb.jpg"
import massage_thumb2 from "./images/massage_thumb.jpg"
import reiki_thumb2 from "./images/reiki_thumb.jpg"
import { Link } from "react-router-dom";

const ServicesInfo = () => {
    return (
        <div className="services-info">
            <h2>Our Holistic Services</h2>
            <div className="services-container">
                <div className="service-column">
                    <img src={acu_thumb2} alt="Acupuncture" />
                    <h3>Acupuncture</h3>
                    <Link to="/acupuncture_info">
                        <button>Learn More</button>
                    </Link>
                </div>
                <div className="service-column">
                    <img src={massage_thumb2} alt="Massage Therapy" />
                    <h3>Massage Therapy</h3>
                    <Link to="/massage_info">
                        <button>Learn More</button>
                    </Link>
                </div>
                <div className="service-column">
                    <img src={reiki_thumb2} alt="Reiki" />
                    <h3>Reiki</h3>
                    <Link to="/reiki_info">
                        <button>Learn More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesInfo;
