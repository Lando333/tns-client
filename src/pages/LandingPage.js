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
        <div>
            <h1>Welcome to Tao Now Solutions!</h1>
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
                    <div>
                        <a href="/login">
                            <button>Login</button>
                        </a>
                        <a href="/register">
                            <button>Register</button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
