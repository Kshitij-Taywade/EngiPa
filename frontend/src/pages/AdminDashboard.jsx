
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser } from "../components/redux/userSlice.js";


const API_URL = "https://engipa-1.onrender.com";

const AdminDashboard = () => {
    const [papers, setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch all uploaded papers
    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const token = localStorage.getItem("token");
                const role = localStorage.getItem("role");

                if (!token || role !== "admin") {
                    navigate("/Login", { replace: true });
                    return;
                }

                const response = await axios.get(
                    `${API_URL}/get-paper`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPapers(response.data.posts || []);
            } catch (err) {
                console.error("Dashboard Error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPapers();
    }, [navigate]);

    // Dashboard statistics
    const stats = useMemo(() => {
        const branchCounts = {
            CSE: 0,
            IT: 0,
            EXTC: 0,
            MECH: 0,
        };

        papers.forEach((paper) => {
            if (branchCounts[paper.department] !== undefined) {
                branchCounts[paper.department]++;
            }
        });

        return {
            total: papers.length,
            branches: Object.values(branchCounts).filter(
                (count) => count > 0
            ).length,
            branchCounts,
        };
    }, [papers]);

    // Sort recently uploaded papers
    const recentPapers = useMemo(() => {
        return [...papers]
            .sort((a, b) => {
                return (
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                );
            })
            .slice(0, 5);
    }, [papers]);

    // Logout
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/Login", { replace: true });
    };

    return (
        <div className="admin-dashboard">

            {/* Sidebar */}
            <aside className="admin-sidebar">

                <div className="admin-brand">
                    <h2>Engi<span>Pa</span></h2>
                    <p>Admin Panel</p>
                </div>

                <nav className="admin-nav">

                    <Link to="/AdminDashboard" className="active">
                        <span>▦</span> Dashboard
                    </Link>

                    <Link to="/PostPaper">
                        <span>＋</span> Upload Papers
                    </Link>

                    <Link to="/About-us">
                        <span>ⓘ</span> About EngiPa
                    </Link>

                    <Link to="/Contact-us">
                        <span>✉</span> Contact
                    </Link>

                </nav>

                <button
                    className="admin-logout"
                    onClick={handleLogout}
                >
                    ↪ Logout
                </button>

            </aside>


            {/* Main Content */}
            <main className="admin-main">

                {/* Header */}
                <header className="admin-header">

                    <div>
                        <p className="admin-breadcrumb">
                            EngiPa / Admin
                        </p>

                        <h1>Dashboard</h1>

                        <p>Manage your Engineering Paper Portal.</p>
                    </div>

                    <div className="admin-profile">
                        <div className="admin-avatar">A</div>

                        <div>
                            <h4>Administrator</h4>
                            <span>Admin</span>
                        </div>
                    </div>

                </header>


                {/* Welcome Section */}
                <section className="admin-welcome">

                    <div>
                        <h2>Welcome back, Admin!</h2>

                        <p>
                            Here's an overview of your EngiPa platform.
                        </p>
                    </div>

                    <Link to="/PostPaper" className="upload-btn">
                        + Upload New Paper
                    </Link>

                </section>


                {/* Loading */}
                {loading && (
                    <div className="admin-message">
                        Loading dashboard data...
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="admin-error">
                        {error}

                        <button onClick={() => window.location.reload()}>
                            Retry
                        </button>
                    </div>
                )}


                {!loading && !error && (
                    <>

                        {/* Statistics */}
                        <section className="admin-stats">

                            <div className="stat-card">
                                <div className="stat-icon purple">
                                    📚
                                </div>

                                <div>
                                    <p>Total Papers</p>
                                    <h2>{stats.total}</h2>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="stat-icon blue">
                                    🏛️
                                </div>

                                <div>
                                    <p>Active Branches</p>
                                    <h2>{stats.branches}</h2>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="stat-icon green">
                                    📄
                                </div>

                                <div>
                                    <p>Recent Uploads</p>
                                    <h2>{recentPapers.length}</h2>
                                </div>
                            </div>

                        </section>


                        {/* Branch Overview */}
                        <section className="admin-section">

                            <div className="section-heading">
                                <div>
                                    <h2>Branch Overview</h2>
                                    <p>Uploaded papers by department</p>
                                </div>
                            </div>

                            <div className="branch-grid">

                                {Object.entries(stats.branchCounts).map(
                                    ([branch, count]) => (

                                        <div
                                            className="branch-card"
                                            key={branch}
                                        >
                                            <h3>{branch}</h3>

                                            <h2>{count}</h2>

                                            <p>Uploaded Papers</p>

                                            <div className="branch-progress">
                                                <div
                                                    style={{
                                                        width: `${
                                                            stats.total
                                                                ? (count / stats.total) * 100
                                                                : 0
                                                        }%`,
                                                    }}
                                                />
                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </section>


                        {/* Recent Papers */}
                        <section className="admin-section">

                            <div className="section-heading">

                                <div>
                                    <h2>Recently Uploaded Papers</h2>
                                    <p>Latest papers available in EngiPa</p>
                                </div>

                                <Link to="/PostPaper">
                                    Upload More +
                                </Link>

                            </div>


                            {recentPapers.length === 0 ? (

                                <div className="empty-papers">
                                    <h3>No Papers Uploaded Yet</h3>

                                    <p>
                                        Start building your paper collection
                                        by uploading the first question paper.
                                    </p>

                                    <Link to="/PostPaper">
                                        Upload First Paper
                                    </Link>
                                </div>

                            ) : (

                                <div className="paper-table-wrapper">

                                    <table className="admin-paper-table">

                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Branch</th>
                                                <th>Semester</th>
                                                <th>Year</th>
                                                <th>Paper Type</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {recentPapers.map((paper) => (

                                                <tr key={paper._id}>

                                                    <td>
                                                        <strong>
                                                            {paper.subject || "N/A"}
                                                        </strong>
                                                    </td>

                                                    <td>
                                                        {paper.department || "N/A"}
                                                    </td>

                                                    <td>
                                                        {paper.semester
                                                            ? `Semester ${paper.semester}`
                                                            : "N/A"}
                                                    </td>

                                                    <td>
                                                        {paper.year || "N/A"}
                                                    </td>

                                                    <td>
                                                        <span className="paper-type">
                                                            {paper.paper_type || "N/A"}
                                                        </span>
                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </section>

                    </>
                )}

            </main>

        </div>
    );
};

export default AdminDashboard;
