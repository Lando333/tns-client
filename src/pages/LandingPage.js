import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import tns_logo from "../images/tns_logo.png";


const LandingPage = ({ baseUrl }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get(baseUrl + "/@me");
                setUser(resp.data);
            } catch (error) {
                console.log("Not authenticated");
            }
        })();
    }, []);

    return (
        <div className="page-container">
            <img id="header-logo" src={tns_logo} alt="TNS Logo" />
            

            {user != null ? (
                <div>
                    <h2>Logged in</h2>
                    <h3>ID: {user.user_id}</h3>
                    <h3>Email: {user.email}</h3>

                </div>
            ) : (
                <div>
                    <p>You are not logged in</p>
                    {/* <div>
                        <a href="/login">
                            <button>Login</button>
                        </a>
                        <a href="/register">
                            <button>Register</button>
                        </a>
                    </div> */}
                </div>
            )}

            <br /> <br /> <br /> 
            <h4>The In-Home Wellness Program You Have Been Looking For</h4>
            <h1>Welcome to Tao Now Solutions!</h1>
            <p>Holistic medicine is the art and science of healing that addresses the whole person – mind, body and spirit. Tao Now Solutions aims to bring that science into your home and every day life. As practitioners of holistic medicine, we integrate conventional and alternative therapies to prevent and treat disease, and most importantly, to promote optimal health. We encourage you to invite us on this wonderful journey of healing.</p>

        </div>
    );
};

export default LandingPage;
