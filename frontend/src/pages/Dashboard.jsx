
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/components/Home/Dashboard.css";



export default function Dashboard() {
    const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const aptitudeModules = [
    "Quantitative Aptitude",
    "Logical Reasoning",
    "Verbal Ability",
    "Data Interpretation",
    "Mock Tests",
  ];

  const paperModules = [
    "By Branch",
    "By Year",
    "By Semester",
    "By Subject",
    "By Paper Type",
  ];

  const modules =
    activeSection === "aptitude"
      ? aptitudeModules
      : paperModules;

  return (
    <div className="dashboard">
      <h1>Welcome to EngiPa</h1>
      <p className="subtitle">
        Prepare smarter. Score higher.
      </p>

      {activeSection === "dashboard" ? (
        <div className="dashboard-cards">
          <div
            className="dashboard-card paper-card"
           onClick={() => navigate("/FindPaper")}
          >

            <span className="card-icon">📚</span>
            <h2>Paper Store</h2>
            <p>
              Access previous-year question papers
              for your engineering subjects.
            </p>
            <span className="explore">Explore Papers →</span>
          </div>

          <div
            className="dashboard-card aptitude-card"
            onClick={() => setActiveSection("aptitude")}
          >
            <span className="card-icon">🎯</span>
            <h2>Aptitude</h2>
            <p>
              Practice aptitude questions and prepare
              for campus placements.
            </p>
            <span className="explore">Explore Aptitude →</span>
          </div>
        </div>
      ) : (
        <section className="module-section">
          <button
            className="back-btn"
            onClick={() => setActiveSection("dashboard")}
          >
            ← Back to Dashboard
          </button>

          <h2>
            {activeSection === "aptitude"
              ? "Aptitude Modules"
              : "Paper Store Modules"}
          </h2>

          <div className="module-list">
            {modules.map((module) => (
              <div
                className="module-card"
                key={module}
                onClick={() => alert(`Opening ${module}`)}
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
