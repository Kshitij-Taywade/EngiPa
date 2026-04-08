import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Register = () => {


  const [Value, setValue] = useState({});
const Navigate=useNavigate();

  const Change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const Submit = async (e) => {
    try{e.preventDefault();
       const response = await axios.post("https://engipa-1.onrender.com/register", {
      ...Value,
      role: "user"
    });


     alert(response.data.message)

     Navigate('/')
    }

    catch(e){
         console.error(e.response?.data || e.message);
    alert(e.response?.data?.message || "Registration failed");

    }
   
  };


  return (
    <div className="Register-Parent">
      <section className="registration-section">
        <h1>Student Registration</h1>

        <form className="register-form" aria-label="Student Registration Form"  onSubmit={Submit}>
          {/* ROW 1 */}
          <div className="form-row">

            <div className="form-group">
              <label htmlFor="name">Full Name</label>
             <input id="name" name="fullName" type="text" value={Value.fullName || ''} onChange={Change} />
            </div>

            <div className="form-group">
              <label htmlFor="enroll">Enrollment Number</label>
              <input id="enroll" name="enrollment" type="text" required 
              value={Value.enrollment  || ''} onChange={Change} />
            </div>

             <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input id="mobile" name="mobile" type="tel" value={Value.mobile  || ''} onChange={Change} />
            </div>


          </div>

          {/* ROW 2 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required value={Value.email  || ''} onChange={Change} />
            </div>

           

            <div className="form-group">
              <label htmlFor="dept">Department</label>
              <select id="dept" name="department" required value={Value.department || '' } onChange={Change}>
                <option value="">Select</option>
                <option value="EXTC">EXTC</option>
              </select>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <input id="password" name="password" type="password" required value={Value.password  || ''} onChange={Change} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="form-row buttons">
            <button type="submit" className="Register-button" >Register</button>
           
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register;