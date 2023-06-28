import React from "react";
import ServicesInfo from "../ServicesInfo";
import MidDisplay from "../MidDisplay";

const LandingPage = () => {
    return (
        <>
            <div className="page-container">
                <h4 id="subheader">The In-Home Wellness Program You Have Been Looking For</h4>
                <h1>Welcome to Tao Now Solutions!</h1>
                <p>Holistic medicine is the art and science of healing that addresses the whole person – mind, body and spirit. Tao Now Solutions aims to bring that science into your home and every day life. As practitioners of holistic medicine, we integrate conventional and alternative therapies to prevent and treat disease, and most importantly, to promote optimal health. We encourage you to invite us on this wonderful journey of healing.</p>
                <br /><br /><br /><br /><br />

                <ServicesInfo /> <br />

                <MidDisplay />

                <div className="contact">
                    <p><a href="mailto:taonowsolutions@gmail.com">Contact Us</a></p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
