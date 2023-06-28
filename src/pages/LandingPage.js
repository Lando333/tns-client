import React from "react";
import ServicesInfo from "../ServicesInfo";

const LandingPage = () => {
    return (
        <>
        <div className="page-container">
            <h4>The In-Home Wellness Program You Have Been Looking For</h4>
            <h1>Welcome to Tao Now Solutions!</h1>
            <p>Holistic medicine is the art and science of healing that addresses the whole person – mind, body and spirit. Tao Now Solutions aims to bring that science into your home and every day life. As practitioners of holistic medicine, we integrate conventional and alternative therapies to prevent and treat disease, and most importantly, to promote optimal health. We encourage you to invite us on this wonderful journey of healing.</p>
            <br /><br /><br /><br /><br />
            <ServicesInfo />

            {/* <img /> */}

            <p>Contact us</p>
        </div>
        </>
    );
};

export default LandingPage;
