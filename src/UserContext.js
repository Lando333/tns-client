import React, { createContext, useEffect, useState } from "react";
import httpClient from "./httpClient";

export const UserContext = createContext();

export const UserProvider = ({ children, baseUrl }) => {
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
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
