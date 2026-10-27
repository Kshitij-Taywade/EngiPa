import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
    {
        id: 1,
        question:
           [ "Simplify: 8888 + 888 + 88 + 8"],
        options: ["9872", "9873", "9871", "9874"],
        correctAnswer: 0,
        solution: [
            "8888 + 888 + 88 + 8 = 9872",
           
        ],
    },
    {
        id: 2,
        question:
            ["Simplify: 715632 – 631104 – 9874 – 999 "],
        options: ["74655", "73655", "73555", "74555"],
        correctAnswer: 1,
        solution: [
            "Given exp = 715632 – (631104 + 9874 + 999)",
            " = 715632 – 641977 = 73655",
             "( where , 631104 + 9874 + 999 = 641977)",
            
        ],
    },
    {
        id: 3,
        question:
            [
            "What value will replace the question mark in each of the following questions?" ,
            "? – 1936248 = 1635773"
            ],
        options: ["3572022", "3572021", "3572023", "3572024"],
        correctAnswer: 1,
        solution: [
            "Let x – 1936248 = 1635773",
            "Then, x = 1635773 + 1936248 = 3572021",
            
        ],
    },
    {
        id: 4,
        question:
               [
            "What value will replace the question mark in each of the following questions?" ,
            "9587 –? = 7429 – 4358"
            ],
        options: ["6515", "6520", "6514", "6516"],
        correctAnswer: 3,
        solution: [
            "Let 9587 – x = 7429 – 4358.",
            "Then, 9587 – x = 3071 ⇒ x = 9587 – 3071 = 6516",

        ],
    },
    {
        id: 5,
        question:
              [
            "What could be the maximum value of Q in the following equation?" ,
            "5P9 + 3R7 + 2Q8 = 1114"
            ],
        options: ["1/5", "1/10", "1/15", "1/20"],
        correctAnswer: 1,
        solution: [
            "We may analyse the given equation as shown:",
            "Clearly, 2 + P + R + Q = 1114",
            "So, the maximum value of Q can be (11 – 2), i.e. 9 (when P = 0, R = 0). ",
            " where,,,,",
            " 1 2",
            " 5 P 9",
            " 3 R 7",
            " 2 Q 8",
            "__________",
            " 1 1 1 4",
        ],
    },
];

export default function NumericalAbility() {
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [answers, setAnswers] = useState({});

    const currentQuestion = questions[currentIndex];
    const isAnswered = selectedAnswer !== null;
    const isCorrect =
        selectedAnswer === currentQuestion.correctAnswer;

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedAnswer(index);
        setAnswers((previous) => ({
            ...previous,
            [currentQuestion.id]: index,
        }));
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((previous) => previous + 1);
            setSelectedAnswer(null);
            setShowSolution(false);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((previous) => previous - 1);
            setSelectedAnswer(null);
            setShowSolution(false);
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowSolution(false);
        setAnswers({});
    };

    const getOptionClass = (index) => {
        if (!isAnswered) return "";

        if (index === currentQuestion.correctAnswer) {
            return "na-option correct";
        }

        if (index === selectedAnswer) {
            return "na-option incorrect";
        }

        return "na-option disabled-option";
    };

    return (
        <div className="na-page">
            <div className="na-container">
            <button
    className="na-back-btn"
    onClick={() =>
        navigate("/Dashboard", {
            state: { showNumericalTopics: true },
        })
    }
    type="button"
>
    ← Back 
</button>
             <span className="na-topic">
                        Number System
                    </span>
                   

                <header className="na-header">
                  
                    <div className="na-meta">
                        <span>{questions.length} Questions</span>
                        <span>No Time Limit</span>
                    </div>
                </header>

                <div className="na-progress-section">
                    <div className="na-progress-text">
                        <span>
                            Question {currentIndex + 1} of{" "}
                            {questions.length}
                        </span>

                        <span>
                            {Object.keys(answers).length} Attempted
                        </span>
                    </div>

                    <div
                        className="na-progress-track"
                        role="progressbar"
                        aria-valuenow={currentIndex + 1}
                        aria-valuemin={1}
                        aria-valuemax={questions.length}
                    >
                        <div
                            className="na-progress-fill"
                            style={{
                                width: `${
                                    ((currentIndex + 1) /
                                        questions.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                <section className="na-question-card">
                  

                    <h4>
                     {currentQuestion.question.map(
                                (step, index) => (
                                    <p key={index}>
                                        <span></span>{" "}
                                        {step}
                                    </p>
                                )
                            )}
</h4>
                    <br />

                    <div className="na-options">
                        {currentQuestion.options.map(
                            (option, index) => {
                                const optionClass =
                                    getOptionClass(index);

                                const isCorrectOption =
                                    isAnswered &&
                                    index ===
                                        currentQuestion.correctAnswer;

                                const isSelected =
                                    selectedAnswer === index;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        className={`na-option ${
                                            optionClass ||
                                            (isSelected
                                                ? "selected"
                                                : "")
                                        }`}
                                        onClick={() =>
                                            handleOptionClick(index)
                                        }
                                        disabled={isAnswered}
                                    >
                                        <span className="na-option-letter">
                                            {String.fromCharCode(
                                                65 + index
                                            )}
                                        </span>

                                        <span className="na-option-text">
                                            {option}
                                        </span>

                                        {isCorrectOption && (
                                            <span className="na-status">
                                                ✓
                                            </span>
                                        )}

                                        {isSelected &&
                                            !isCorrect && (
                                                <span className="na-status">
                                                    ✕
                                                </span>
                                            )}
                                    </button>
                                );
                            }
                        )}
                    </div>

                    {isAnswered && (
                        <div
                            className={`na-feedback ${
                                isCorrect
                                    ? "feedback-correct"
                                    : "feedback-incorrect"
                            }`}
                            role="status"
                        >
                            <strong>
                                {isCorrect
                                    ? "Correct! Well done."
                                    : "Incorrect. Keep learning!"}
                            </strong>

                            <p>
                                Correct answer:{" "}
                                {
                                    currentQuestion.options[
                                        currentQuestion.correctAnswer
                                    ]
                                }
                            </p>
                        </div>
                    )}

                    <div className="na-solution-actions">
                        <button
                            type="button"
                            className="na-solution-btn"
                            onClick={() =>
                                setShowSolution((previous) => !previous)
                            }
                        >
                            {showSolution
                                ? "Hide Solution ↑"
                                : "View Solution ↓"}
                        </button>
                    </div>

                    {showSolution && (
                        <div className="na-solution">
                            <h3>Solution</h3>

                            {currentQuestion.solution.map(
                                (step, index) => (
                                    <p key={index}>
                                        <span></span>{" "}
                                        {step}
                                    </p>
                                )
                            )}
                        </div>
                    )}

                    <div className="na-navigation">
                        <button
                            type="button"
                            className="na-nav-btn previous-btn"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            ← Previous
                        </button>

                        {currentIndex < questions.length - 1 ? (
                            <button
                                type="button"
                                className="na-nav-btn next-btn"
                                onClick={handleNext}
                            >
                                Next Question →
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="na-nav-btn next-btn"
                                onClick={handleReset}
                            >
                                Practice Again ↻
                            </button>
                        )}
                    </div>
                </section>

               
            </div>
        </div>
    );
}
