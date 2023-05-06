import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DashboardPage from "./pages/dashboard-page.jsx";
import CreatePage from "./pages/create-page.jsx";
import NewPage from "./pages/new-page.jsx";
import ProgressPage from "./pages/progress-page.jsx";
import CompletedPage from "./pages/completed-page.jsx";
import CanceledPage from "./pages/canceled-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import LoginPage from "./pages/login-page.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import NotFoundPage from "./pages/not-found-page.jsx";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader.jsx";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<DashboardPage/>} />
                    <Route exact path="/create" element={<CreatePage/>} />
                    <Route exact path="/new-task" element={<NewPage/>} />
                    <Route exact path="/progress" element={<ProgressPage/>} />
                    <Route exact path="/completed" element={<CompletedPage/>} />
                    <Route exact path="/canceled" element={<CanceledPage/>} />
                    <Route exact path="/profile" element={<ProfilePage/>} />
                    <Route exact path="/login" element={<LoginPage/>} />
                    <Route exact path="/register" element={<RegistrationPage/>} />
                    <Route path="*" element={<NotFoundPage/>} />
                </Routes>
            </BrowserRouter>
            <FullScreenLoader/>
        </>
    );
};

export default App;