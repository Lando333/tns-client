import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./UserContext";

const App = ({ baseUrl }) => {

    return (
        <UserProvider baseUrl={baseUrl}>
            <div>
                <NavBar baseUrl={baseUrl} />
                <div className="app-container">
                    <Outlet />
                </div>
            </div>
        </UserProvider>
    );
};

export default App;
