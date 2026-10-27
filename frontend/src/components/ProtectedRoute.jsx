
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./redux/userSlice";

const SESSION_DURATION = 24 * 60 * 60 * 1000;

const ProtectedRoute = () => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const token = localStorage.getItem("token");
    const lastActivity = Number(
        localStorage.getItem("lastActivity")
    );

    const sessionExpired =
        !lastActivity ||
        Date.now() - lastActivity >= SESSION_DURATION;

    if (!user || !token || sessionExpired) {
        if (user || token) {
            dispatch(logoutUser());
        }

        alert("Please login first to access this module.");

        return (
            <Navigate
                to="/Login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
