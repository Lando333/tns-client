import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";
import { UserContext } from "./UserContext";

const NavBar = ({ baseUrl }) => {
    const { isTherapist } = useContext(UserContext);

    console.log(isTherapist)

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
                {isTherapist &&
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
