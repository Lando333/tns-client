import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

const baseUrl = '//localhost:5555'

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" 
                    element={<LoginPage baseUrl={baseUrl} />} 
                />

                <Route path="/register" 
                    element={<RegisterPage baseUrl={baseUrl} />} 
                    />
                
                <Route path="/" 
                    element={<LandingPage baseUrl={baseUrl} />} 
                    />
                
                <Route path="*" 
                    element={<NotFound baseUrl={baseUrl} />} 
                    />
            </Routes>
        </Router>
    );
};

export default AppRouter;
