import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const App = ({ baseUrl }) => {
    
    return (
        <div>
            <NavBar baseUrl={baseUrl} />
            <div className="app-container">
                <Outlet />
            </div>
        </div>
    );
};

export default App;
