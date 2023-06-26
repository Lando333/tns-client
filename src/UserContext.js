import React, { createContext, useEffect, useState } from "react";
import httpClient from "./httpClient";


const baseUrl = "http://localhost:5555"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await httpClient.get(baseUrl + "/@me");
                console.log(resp.data)
                setUser(resp.data);
            } catch (error) {
                console.log("Not authenticated");
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
