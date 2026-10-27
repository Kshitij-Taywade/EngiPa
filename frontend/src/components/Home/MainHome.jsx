
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const MainHome = () => {
    const [Value, setValue] = useState({
        role: "",
        enrollment: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Change = (e) => {
        const { name, value } = e.target;

        setValue((previousValue) => ({
            ...previousValue,
            [name]: value,
        }));
    };

    const Submit = async (e) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);

        try {
            const payload = {
                role: Value.role,
                password: Value.password,
            };

            if (Value.role === "admin") {
                payload.clg_ID = Value.enrollment;
            } else {
                payload.enrollment = Value.enrollment;
            }

           const response = await axios.post(
    "https://engipa-1.onrender.com/login",
    payload
);

            const userData = {
                id: response.data.id,
                role: response.data.role,
                name: response.data.name || "Student",
                email: response.data.email || "",
                profilePicture:
                    response.data.profilePicture || "/default-avatar.png",
            };

            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            dispatch(setUser(userData));

            // Redirect after successful login
            navigate("/Dashboard", { replace: true });
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Home-parent">
            <div className="main-left-div">
                <div className="img-div">
                    <img
                        src="https://ik.imagekit.io/9ntvk0xhp/EngiPa%20main%20page%20image.png"
                        alt="EngiPa banner"
                    />
                </div>
            </div>

            <div className="main-right-div">
                <div className="loginDiv">
                    <h1>Login</h1>

                    <form className="loginForm" onSubmit={Submit}>
                        <select
                            required
                            name="role"
                            value={Value.role}
                            onChange={Change}
                        >
                            <option value="" disabled>
                                Select Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">Student</option>
                        </select>

                        <input
                            type="text"
                            placeholder={
                                Value.role === "admin"
                                    ? "College ID"
                                    : "Enrollment"
                            }
                            id="loginUsername"
                            name="enrollment"
                            required
                            value={Value.enrollment}
                            onChange={Change}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            id="loginPassword"
                            name="password"
                            required
                            value={Value.password}
                            onChange={Change}
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="login-div-register-forgot">
                        <Link to="/Register">
                            Student Registration
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHome;
