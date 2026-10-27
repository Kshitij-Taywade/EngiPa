
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/userSlice";
import logo from "./EngiPa.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = Boolean(user);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        closeMenu();
        navigate("/");
    };

    return (
        <>
            <div className="Navbar-parent">
                {/* Logo */}
                <div className="logo-div">
                    <Link
                        to={isLoggedIn ? "/Dashboard" : "/"}
                        onClick={closeMenu}
                    >
                        <img src={logo} alt="EngiPa-logo" />
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="links-div">
                    {isLoggedIn && (
                        <Link to="/Dashboard" className="nav-links">
                            Home
                        </Link>
                    )}

                    <Link to="/About-us" className="nav-links">
                        About Us
                    </Link>

                    <Link to="/Contact-us" className="nav-links">
                        Contact Us
                    </Link>

                    {!isLoggedIn && (
                        <>
                            <Link to="/Login" className="nav-links">
                                Login
                            </Link>

                            <Link to="/Register" className="nav-links">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Profile and hamburger */}
                <div className="navbar-right">
                    {isLoggedIn && (
                        <Link
                            to="/Dashboard"
                            className="profile-link desktop-profile"
                            title="Profile"
                        >
                            <img
                                src={
                                    user?.profilePicture ||
                                    "/default-avatar.png"
                                }
                                alt="Profile"
                                className="navbar-profile-picture"
                            />
                        </Link>
                    )}

                    <button
                        type="button"
                        className="menu-icon"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>

            {/* Mobile navigation */}
            <div className={`links-div2 ${isOpen ? "open" : ""}`}>
                {isLoggedIn && (
                    <Link
                        to="/Dashboard"
                        className="nav-links"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>
                )}

                <Link
                    to="/About-us"
                    className="nav-links"
                    onClick={closeMenu}
                >
                    About Us
                </Link>

                <Link
                    to="/Contact-us"
                    className="nav-links"
                    onClick={closeMenu}
                >
                    Contact Us
                </Link>

                {!isLoggedIn && (
                    <>
                        <Link
                            to="/Login"
                            className="nav-links"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>

                        <Link
                            to="/Register"
                            className="nav-links"
                            onClick={closeMenu}
                        >
                            Register
                        </Link>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link
                            to="/Dashboard"
                            className="nav-links mobile-profile-link"
                            onClick={closeMenu}
                        >
                            <img
                                src={
                                    user?.profilePicture ||
                                    "/default-avatar.png"
                                }
                                alt="Profile"
                                className="navbar-profile-picture"
                            />
                            <span>Profile</span>
                        </Link>

                        <button
                            type="button"
                            className="nav-links"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
