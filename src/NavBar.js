import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";
import { UserContext } from "./UserContext";

const NavBar = ({ baseUrl }) => {
    const user = useContext(UserContext);
    const [isTherapist, setIsTherapist] = useState(false);

    useEffect(() => {
        console.log("Inside useEffect");
        console.log("baseUrl:", baseUrl);
        console.log("user:", user);
    }, [baseUrl, user]);


    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                console.log(baseUrl)
                const response = await fetch(`${baseUrl}/all_therapists`);
                if (response.ok) {
                    const therapists = await response.json();
                    console.log(therapists)
                    const therapistIds = therapists.map((therapist) => therapist.therapist_id);
                    setIsTherapist(therapistIds.includes(user.therapist_id));
                } else {
                    console.error("Failed to fetch therapists");
                }
            } catch (error) {
                console.error("Error while fetching therapists", error);
            }
        };
        if (user && user.role === "therapist") {
            fetchTherapists();
        }
    }, [baseUrl, user]);

    return (<>
        <nav>
            <ul className="navbar">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/schedule">Schedule</Link>
                </li>
                <li>
                    <Link to="/membership">Membership</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {!isTherapist &&
                <li>
                    <Link to="/therapist">Therapist Profile</Link>
                </li>
                }
            </ul>
            <LoginBox baseUrl={baseUrl} />
        </nav>
    </>
    );
};

export default NavBar;
