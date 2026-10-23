
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../redux/userSlice";
import logo from "./EngiPa.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const location = useLocation();

    // Automatically log out when the Login page opens
    useEffect(() => {
        if (location.pathname.toLowerCase() === "/login") {
            dispatch(logoutUser());
            setIsOpen(false);
        }
    }, [location.pathname, dispatch]);

    const isLoggedIn = Boolean(user);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <div className="Navbar-parent">
                <div className="logo-div">
                    <img src={logo} alt="EngiPa-logo" />
                </div>

                {/* Desktop navigation */}
                <div className="links-div">
                    {isLoggedIn && (
                        <Link to="/" className="nav-links">
                            Home
                        </Link>
                    )}

                    <Link to="/About-us" className="nav-links">
                        About Us
                    </Link>

                    <Link to="/Contact-us" className="nav-links">
                        Contact Us
                    </Link>
                </div>

                {/* Profile and mobile menu */}
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
                        to="/"
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

                {isLoggedIn && (
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
                )}
            </div>
        </>
    );
};

export default Navbar;
