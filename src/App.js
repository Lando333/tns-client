import React from "react";
import NavBar from "./NavBar";

const App = ({ children }) => {
    return (
        <div>
            <NavBar />
            <div>{children}</div>
        </div>
    );
};

export default App;
