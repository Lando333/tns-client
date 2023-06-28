import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";
import { UserContext } from "./UserContext";
import DropdownMenu from "./DropdownMenu";

const NavBar = ({ baseUrl }) => {
    const { isTherapist } = useContext(UserContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
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
