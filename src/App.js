import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const App = ({ baseUrl }) => {
    
    return (
        <div>
            <NavBar baseUrl={baseUrl} />
            <Outlet />
        </div>
    );
};

export default App;
