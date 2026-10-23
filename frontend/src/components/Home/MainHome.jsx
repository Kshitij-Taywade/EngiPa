
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../redux/userSlice";

const MainHome = () => {
    const [Value, setValue] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Clear the previous session when the login page opens
    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    const Change = (e) => {
        const { name, value } = e.target;
        setValue({ ...Value, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();

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

            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            dispatch(
                setUser({
                    id: response.data.id,
                    role: response.data.role,
                    name: response.data.name || "Student",
                    email: response.data.email || "",
                    profilePicture: "/default-avatar.png",
                })
            );

            if (response.data.role === "admin") {
                navigate("/PostPaper");
            } else {
                navigate("/Dashboard");
            }
        } catch (e) {
            alert(e.response?.data?.message || "Login failed");
            console.error(e.response?.data || e.message);
        }
    };

    return (
        <div className="Home-parent">
            <div className="main-left-div">
                <div className="img-div">
                    <img
                        src="https://ik.imagekit.io/9ntvk0xhp/EngiPa%20main%20page%20image.png"
                        alt="Banner"
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
                            value={Value.role || ""}
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
                            placeholder="Enrollment"
                            id="loginUsername"
                            name="enrollment"
                            required
                            value={Value.enrollment || ""}
                            onChange={Change}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            id="loginPassword"
                            name="password"
                            required
                            value={Value.password || ""}
                            onChange={Change}
                        />

                        <button type="submit">Login</button>
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
