import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import httpClient from "./httpClient";

const LoginBox = ({ baseUrl }) => {
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

    

    if (user != null) {
        // console.log(user)
        return <div className="login">
            <p>Welcome, {user.first_name}!</p>

            <Link to="/" onClick={logoutUser}>Logout</Link>
                </div>
    } else {
        return (
            <div className="login">
                <p>You are not logged in</p>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>
        );
    }
};

export default LoginBox;
