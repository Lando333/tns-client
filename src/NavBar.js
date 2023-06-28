import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";
import { UserContext } from "./UserContext";
import DropdownMenu from "./DropdownMenu";
import "./dropdown.css"


const NavBar = ({ baseUrl }) => {
    const { isTherapist } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeDropdownTimeoutRef = useRef(null); // Ref to store the timer ID

    const handleDropdownOpen = () => {
        setIsDropdownOpen(true); clearTimeout(closeDropdownTimeoutRef.current); // Clear any existing timer
    };

    const handleDropdownClose = () => {
        // Set the delay in milliseconds (e.g., 1000 for 1 second)
        closeDropdownTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 1000);
    };

    return (<>
        <nav
            onMouseLeave={handleDropdownClose}>
            <ul className="navbar">
                <li
                    onMouseEnter={handleDropdownOpen}
                >
                    <Link to="/">Home</Link><br /><br />
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

            {isDropdownOpen && <DropdownMenu />}

            <LoginBox baseUrl={baseUrl} />
        </nav>
    </>
    );
};

export default NavBar;
