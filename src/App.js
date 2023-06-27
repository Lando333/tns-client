import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserContext";
import tns_logo from "./images/tns_logo.png";

const App = ({ baseUrl }) => {

    return (
        <UserProvider baseUrl={baseUrl}>
            <div>
                <NavBar baseUrl={baseUrl} />
                <img id="header-logo" src={tns_logo} alt="TNS Logo" />
                <div className="app-container">
                    <Outlet />
                </div>
            </div>
        </UserProvider>
    );
};

export default App;
