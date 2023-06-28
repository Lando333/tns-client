import React from "react";
import { Link } from "react-router-dom";
import "./dropdown.css"

const DropdownMenu = () => {
    return (
        <div>
            <ul className="dropdown-menu">
                <li>
                    <Link to="/acupuncture_info">Acupuncture</Link>
                </li>
                <li>
                    <Link to="/massage_info">Massage Therapy</Link>
                </li>
                <li>
                    <Link to="/reiki_info">Reiki</Link>
                </li>
            </ul>
        </div>
    );
};

export default DropdownMenu;
