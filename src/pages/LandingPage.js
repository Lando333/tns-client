import React, { useState, useEffect } from "react";
// import { Routes } from "react-router-dom"
import httpClient from "../httpClient";
// import { User } from "../types";

const LandingPage = ({baseUrl}) => {
    const [user, setUser] = useState(null);

    const logoutUser = async () => {
        await httpClient.post(baseUrl + "/logout");
        window.location.href = "/";
    };

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
            {user != null ? (
                <div>
                    <h2>Logged in</h2>
                    <h3>ID: {user.id}</h3>
                    <h3>Email: {user.email}</h3>

                    <button onClick={logoutUser}>Logout</button>
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