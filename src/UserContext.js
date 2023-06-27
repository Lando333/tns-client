import React, { createContext, useEffect, useState } from "react";
import httpClient from "./httpClient";

export const UserContext = createContext();

export const UserProvider = ({ children, baseUrl }) => {
    const [user, setUser] = useState(null);
    const [isTherapist, setIsTherapist] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await httpClient.get(baseUrl + "/@me");
                setUser(resp.data);
            } catch (error) {
                console.log("Not authenticated");
            }
        };
        fetchUser();
    }, [baseUrl]);

    useEffect(() => {
        const fetchTherapistStatus = async () => {
            try {
                const response = await fetch(`${baseUrl}/all_therapists`);
                if (response.ok) {
                    const therapists = await response.json();
                    const therapistUserIds = therapists.map((therapist) => therapist.user_id);
                    setIsTherapist(therapistUserIds.some((id) => id === user.user_id));
                } else {
                    console.error("Failed to fetch therapists");
                }
            } catch (error) {
                console.error("Error while fetching therapists", error);
            }
        };

        if (user) {
            fetchTherapistStatus();
        }
    }, [baseUrl, user]);

return (
    <UserContext.Provider value={{ user, isTherapist }}>
        {children}
    </UserContext.Provider>
);
};
