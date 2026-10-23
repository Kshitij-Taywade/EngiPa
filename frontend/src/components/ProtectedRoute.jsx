
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const user = useSelector((state) => state.user.user);
    const token = localStorage.getItem("token");

    if (!user || !token) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
