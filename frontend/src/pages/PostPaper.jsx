import React from 'react';
import axios from 'axios';

const PostPaper = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");

    axios.post("https://engipa-1.onrender.com/upload-paper", formData, {
      headers: {
        Authorization: `Bearer ${token}`
        // ✅ Do not set Content-Type manually, Axios handles it
      }
    })
    .then((res) => {
      console.log(res);
      alert("Paper uploaded successfully");
    })
    .catch((err) => {
      console.error(err);
      alert("Upload failed");
    });
  };

  return (
    <div className="PostPaper-parent">
      <section className="Post-paper-section">
        <h1>Post Papers</h1>

        <form className="post-paper-form" onSubmit={handleSubmit}>
          {/* ROW 1 */}
          <div className="form-roww">
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select id="branch" name="department" required>
                <option value="">Select Branch</option>
                <option value="EXTC">EXTC</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="MECH">MECH</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="year">Academic Year</label>
              <select id="year" name="year" required>
                <option value="">Select Year</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="form-roww">
            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select id="semester" name="semester" required>
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
                name="subject"
                type="text"
                placeholder="Ex. Digital Image Processing"
                required
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="form-roww">
            <div className="form-group">
              <label htmlFor="paper-type">Paper Type</label>
              <select id="paper-type" name="paper_type" required>
                <option value="">Select Exam Type</option>
                <option value="midterm">Mid Semester</option>
                <option value="final">End Semester</option>
                <option value="improvement">Improvement</option>
                <option value="supplementary">Supplementary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="file">Paper File</label>
              <input
                id="file"
                name="file"   // ✅ must match backend multer config
                type="file"
                required
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="form-row buttons">
            <button type="submit">Post Paper</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default PostPaper;