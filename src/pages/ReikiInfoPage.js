import React from "react";
import { Link } from "react-router-dom";
import reiki_info from "../images/reiki_info.webp"

const ReikiInfoPage = () => {
    return (
        <div className="page-container">
            <img className="info-pic" src={reiki_info} alt="reiki" />
            <div className="left-align">
                <p>Universe Energy</p>
                <h2>Reiki</h2>
                <p>What is Reiki?<br /><br />
                    Reiki is an ancient form of energy healing. The word Reiki translates from Japanese to Universal(Rei) Energy(Ki). It is a way to align your energy with the universe to remove blockages or help overcome adversity in a way similar to meditation.</p>
                <p>With Reiki therapy, patients claim to feel relaxed and renewed after each session. Our Reiki therapists are trained in various intuitive techniques, so they will tailor your session to work on your specific goals and needs. The effects of a Reiki treatment may be subtle at first, but long term effects can be very profound.</p>
                <p>What can I expect from a Reiki Treatment?<br /><br />
                    During a treatment your Reiki therapist may or may not place their hands on your body. This is completely normal. Your Reiki therapist has been attuned to the vibration of universal energy. They have been trained to use their body as a conduit to focus healing energy where you need it most.</p><br /><br />
                <Link to="/schedule">
                    <button>Book an Appointment</button>
                </Link>
                <br /><br /><br /><br /><br />
            </div>
        </div>
    );
};

export default ReikiInfoPage;
