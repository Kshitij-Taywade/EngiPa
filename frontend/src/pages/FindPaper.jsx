import React, { useState } from 'react';
import axios from 'axios';

const FindPaper = () => {
  const [posts, setPosts] = useState([]);
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [paper_type, setPaperType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://engipa-1.onrender.com/get-paper", {
        params: { department, year, semester, subject, paper_type }
      });
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="FindPaper-parent">
      <section className="find-paper-section">
        <h1>Find Papers</h1>
        <form className="find-paper-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="EXTC">EXTC</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="MECH">MECH</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Academic Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                required
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paper_type">Paper Type</label>
              <select
                id="paper_type"
                value={paper_type}
                onChange={(e) => setPaperType(e.target.value)}
                required
              >
                <option value="">Select Exam Type</option>
                <option value="midterm">Mid Semester</option>
                <option value="final">End Semester</option>
                <option value="improvement">Improvement</option>
                <option value="supplementary">Supplementary</option>
              </select>
            </div>
          </div>

          <div className="form-row buttons">
            <button type="submit">Find Paper</button>
          </div>
        </form>
      </section>

      <section className="feed-section"> 
        {posts.length > 0 ? (
          posts.map((post) => (
            
            <div key={post._id || post.file} className="find-paper">
              <div className="paper-left-div">
                <img src="https://static.pw.live/5eb393ee95fab7468a79d189/8ef9635c-1992-4f24-8e93-99e78c5a5c26.png" alt="paper" />
              </div>

              <div  className="paper-right-div">
              <p>Subject : {post.subject}</p>
              <p>Department : {post.department}</p>
              <p>Year : {post.year}</p>
              <p>Semester : {post.semester}</p>
              <p>Paper Type : {post.paper_type}</p>

              <div  className="uploaded-paper-div">
              <a href={post.file} target="_blank" rel="noopener noreferrer">
                View Paper
              </a>
              </div>

              </div>
            </div>
          ))
        ) : (
          <h1>No posts available</h1>
        )}
      </section>
    </div>
  );
};

export default FindPaper;