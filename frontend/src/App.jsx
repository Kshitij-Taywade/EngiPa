
import React, { useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import NumberSystem from "./components/Aptitude/NumberSystem.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Register from "./pages/Register.jsx";
import FindPaper from "./pages/FindPaper.jsx";
import PostPaper from "./pages/PostPaper.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import PaperViewer from "./pages/PaperViewer.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import {
    logoutUser,
    updateLastActivity,
} from "./components/redux/userSlice.js";

const SESSION_DURATION = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL = 60 * 1000;

// Manages the user's 24-hour inactivity session
const SessionManager = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!user) return;

        const checkSession = () => {
            const lastActivity = Number(
                localStorage.getItem("lastActivity")
            );

            if (
                !lastActivity ||
                Date.now() - lastActivity >= SESSION_DURATION
            ) {
                dispatch(logoutUser());
            }
        };

        const handleActivity = () => {
            const lastActivity = Number(
                localStorage.getItem("lastActivity")
            );

            // Do not renew an already expired session
            if (
                !lastActivity ||
                Date.now() - lastActivity >= SESSION_DURATION
            ) {
                dispatch(logoutUser());
                return;
            }

            dispatch(updateLastActivity());
        };

        checkSession();

        const activityEvents = [
            "pointerdown",
            "keydown",
            "scroll",
            "touchstart",
        ];

        activityEvents.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        const intervalId = window.setInterval(
            checkSession,
            CHECK_INTERVAL
        );

        return () => {
            activityEvents.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });

            window.clearInterval(intervalId);
        };
    }, [user, dispatch, location.pathname]);

    return null;
};

const App = () => {
    return (
        <BrowserRouter>
            <SessionManager />

            <Navbar />

            <Routes>
                {/* Public dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />

                {/* Public pages */}
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route
                    path="/AdminRegister"
                    element={<AdminRegister />}
                />
                <Route path="/About-us" element={<About />} />
                <Route path="/Contact-us" element={<Contact />} />

                {/* Protected pages */}
               {/* Protected pages */}
<Route element={<ProtectedRoute />}>
    <Route path="/FindPaper" element={<FindPaper />} />
    <Route path="/PostPaper" element={<PostPaper />} />
    <Route path="/paper/:id" element={<PaperViewer />} />

    {/* Aptitude Learning */}
    <Route
        path="/Aptitude/NumberSystem"
        element={<NumberSystem />}
    />
</Route>

                {/* Unknown URLs */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
};

export default App;
