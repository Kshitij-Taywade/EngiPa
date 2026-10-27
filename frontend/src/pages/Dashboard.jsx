
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/components/Home/Dashboard.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");

    const aptitudeModules = [
        "Numerical Ability",
        "Logical Reasoning",
        "Verbal Ability",
        "Mock Tests",
    ];

    const numericalabilityTopic = [
        "Number System",
        "Percentage",
    ];

    const paperModules = [
        "By Branch",
        "By Year",
        "By Semester",
        "By Subject",
        "By Paper Type",
    ];

    // Display the appropriate module list
    const modules =
        activeSection === "aptitude"
            ? aptitudeModules
            : activeSection === "numerical-ability"
            ? numericalabilityTopic
            : paperModules;

    const handleModuleClick = (module) => {
        // Open Numerical Ability topics
        if (
            activeSection === "aptitude" &&
            module === "Numerical Ability"
        ) {
            setActiveSection("numerical-ability");
            return;
        }

        // Open Mock Tests
        if (module === "Mock Tests") {
            navigate("/MockTests");
            return;
        }

        // Handle Numerical Ability topics
        if (activeSection === "numerical-ability") {
            if (module === "Number System") {
                
                navigate("/Aptitude/NumberSystem");
                return;
            }

            if (module === "Percentage") {
                navigate("/Aptitude/percentage");
                return;
            }
        }

        // Open other Aptitude modules
        if (activeSection === "aptitude") {
            navigate(
                `/Aptitude/${module
                    .toLowerCase()
                    .replaceAll(" ", "-")}`
            );
            return;
        }

        // Open Paper Store filters
        navigate("/FindPaper", {
            state: {
                filterBy: module,
            },
        });
    };

    // Support Enter and Space keyboard keys
    const handleKeyDown = (event, callback) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            callback();
        }
    };

    // Navigate back to the previous menu
    const handleBack = () => {
        if (activeSection === "numerical-ability") {
            setActiveSection("aptitude");
        } else {
            setActiveSection("dashboard");
        }
    };

    return (
        <div className="dashboard">
            <h1>Welcome to EngiPa</h1>

            <p className="subtitle">
                Prepare smarter. Score higher.
            </p>

            {activeSection === "dashboard" ? (
                <div className="dashboard-cards">

                    {/* Paper Store */}
                    <div
                        className="dashboard-card paper-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate("/FindPaper")}
                        onKeyDown={(event) =>
                            handleKeyDown(event, () =>
                                navigate("/FindPaper")
                            )
                        }
                    >
                        <h2>Paper Store</h2>
                        <p>
                            Access previous-year question papers
                            for your engineering subjects.
                        </p>
                        <span className="explore">
                            Explore Papers →
                        </span>
                    </div>

                    {/* Aptitude */}
                    <div
                        className="dashboard-card aptitude-card"
                        role="button"
                        tabIndex={0}
                        onClick={() =>
                            setActiveSection("aptitude")
                        }
                        onKeyDown={(event) =>
                            handleKeyDown(event, () =>
                                setActiveSection("aptitude")
                            )
                        }
                    >
                        <h2>Aptitude</h2>
                        <p>
                            Practice aptitude questions and prepare
                            for campus placements.
                        </p>
                        <span className="explore">
                            Explore Aptitude →
                        </span>
                    </div>
                </div>
            ) : (
                <section className="module-section">
                    <button
                        type="button"
                        className="back-btn"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>

                    <h2>
                        {activeSection === "aptitude"
                            ? "Aptitude Modules"
                            : activeSection === "numerical-ability"
                            ? "Numerical Ability Topics (Learning)"
                            : "Paper Store Modules"}
                    </h2>

                    <div className="module-list">
                        {modules.map((module) => (
                            <div
                                className="module-card"
                                key={module}
                                role="button"
                                tabIndex={0}
                                onClick={() =>
                                    handleModuleClick(module)
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(event, () =>
                                        handleModuleClick(module)
                                    )
                                }
                            >
                                <span>{module}</span>
                                <span>→</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
