import React from "react";
import { Link } from "react-router-dom";
import LoginBox from "./LoginBox";

const NavBar = ({ baseUrl }) => {
    return (
        <nav>
            <ul>
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
            </ul>
            <LoginBox baseUrl={baseUrl} />
        </nav>
    );
};

export default NavBar;
