
import React, { useEffect } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages
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
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Redux
import {
    logoutUser,
    updateLastActivity,
} from "./components/redux/userSlice.js";


const SESSION_DURATION = 24 * 60 * 60 * 1000;
const CHECK_INTERVAL = 60 * 1000;



// SESSION MANAGER


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

            // Do not renew an expired session
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


// ========================================
// ROLE BASED ROUTE
// ========================================

const RoleRoute = ({ allowedRole }) => {

    const user = useSelector((state) => state.user.user);

    const token = localStorage.getItem("token");

    const role = user?.role || localStorage.getItem("role");


    if (!token || !role) {
        return <Navigate to="/Login" replace />;
    }


    if (role !== allowedRole) {

        if (role === "admin") {
            return <Navigate to="/AdminDashboard" replace />;
        }

        if (role === "user") {
            return <Navigate to="/Dashboard" replace />;
        }

        return <Navigate to="/Login" replace />;
    }


    return <Outlet />;
};



// MAIN APP


const App = () => {

    return (

        <BrowserRouter>

            <SessionManager />

            <Navbar />

            <Routes>


                {/* =================================
                    PUBLIC HOME PAGE
                ================================= */}

                <Route
                    path="/"
                    element={<Dashboard />}
                />


                {/* =================================
                    PUBLIC PAGES
                ================================= */}

                <Route
                    path="/Login"
                    element={<Login />}
                />

                <Route
                    path="/Register"
                    element={<Register />}
                />

                <Route
                    path="/AdminRegister"
                    element={<AdminRegister />}
                />

                <Route
                    path="/About-us"
                    element={<About />}
                />

                <Route
                    path="/Contact-us"
                    element={<Contact />}
                />


                {/* =================================
                    AUTHENTICATED ROUTES
                ================================= */}

                <Route element={<ProtectedRoute />}>

                    
                    {/* =================================
                        STUDENT ROUTES
                    ================================= */}

                    <Route element={<RoleRoute allowedRole="user" />}>

                        <Route
                            path="/Dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/FindPaper"
                            element={<FindPaper />}
                        />

                        <Route
                            path="/paper/:id"
                            element={<PaperViewer />}
                        />

                        <Route
                            path="/Aptitude/NumberSystem"
                            element={<NumberSystem />}
                        />

                    </Route>


                    {/* =================================
                        ADMIN ROUTES
                    ================================= */}

                    <Route element={<RoleRoute allowedRole="admin" />}>

                        <Route
                            path="/AdminDashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/PostPaper"
                            element={<PostPaper />}
                        />

                    </Route>

                </Route>


                {/* =================================
                    UNKNOWN URL
                ================================= */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>


            <Footer />

        </BrowserRouter>

    );

};

export default App;