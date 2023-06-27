import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import NewTherapistPage from "./pages/NewTherapistPage";
import MembershipPage from "./pages/MembershipPage";
import TherapistPage from "./pages/TherapistPage";
import SchedulePage from "./pages/SchedulePage";
import AboutPage from "./pages/AboutPage";
import App from "./App";

const baseUrl = "http://localhost:5555"

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App baseUrl={baseUrl} />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage baseUrl={baseUrl} />} />
                    <Route path="/register" element={<RegisterPage baseUrl={baseUrl} />} />
                    <Route path="/schedule" element={<SchedulePage baseUrl={baseUrl} />} />
                    <Route path="/create_therapist" element={<NewTherapistPage />} />
                    <Route path="/therapist" element={<TherapistPage baseUrl={baseUrl} />} />
                    <Route path="/membership" element={<MembershipPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRouter;
