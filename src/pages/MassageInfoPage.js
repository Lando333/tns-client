import React from "react";
import { Link } from "react-router-dom";
import massage_info from "../images/massage_info.webp"


const MassageInfoPage = () => {
    return (
        <div className="page-container">
            <img className="info-pic" src={massage_info} alt="massage" />
            <div className="left-align">
                <p>An Intuitive Touch</p>
                <h2>Massage Therapy</h2>
                <p>What is Massage Therapy and why is it good for me?<br /><br />
                    Massage therapy is manual manipulation of soft body tissues (muscle, connective tissue, tendons and ligaments) to enhance a person’s health and well-being. People seek massage therapy for a variety of reasons such as stress and anxiety reduction, to relax muscles, rehabilitate injuries, reduce pain, and promote overall health and wellness. There are dozens of types of massage therapy methods, also called modalities.</p>
                <p>How do I know which modality is right for me?<br /><br />
                    Experiment! Certain modalities do have properties that others don't, for example a Swedish massage will leave you feeling relaxed and refreshed, while a Deep Tissue massage would help with deep or chronic pain relief.</p>
                <p>We offer an assortment of modalities including Swedish, Deep Tissue, Trigger Point Therapy, Tui Na, Asian Bodywork, Reflexology, Lymph Drainage, Sports Massage Pre- and Post-Event, Myofascial Release, Prenatal, and Medical Focus treatments. The modalities are not exclusive to a single treatment, talk to your Massage Therapist and they will work with you to create a customized therapeutic experience.</p><br /><br />
                <Link to="/schedule">
                    <button>Book an Appointment</button>
                </Link>
                <br /><br /><br /><br /><br />
            </div>
        </div>
    );
};

export default MassageInfoPage;
