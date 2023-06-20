import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import httpClient from "./httpClient";

const LoginBox = ({ baseUrl }) => {
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

    if (user) {
        return <p>Welcome, {user.name}!</p>;
    } else {
        return (
            <div>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
            </div>
        );
    }
};

export default LoginBox;
