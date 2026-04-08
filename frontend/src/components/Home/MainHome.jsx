import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'
 import axios from 'axios'
  import { useNavigate } from 'react-router-dom';
const MainHome = () => {

 const [Value, setValue] = useState({});
const Navigate=useNavigate();

  const Change = (e) => { 
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });   
  };

  const Submit = async (e) => {
  e.preventDefault();
  try {
    let payload = { role: Value.role, password: Value.password };

    if (Value.role === "admin") {
      payload.clg_ID = Value.enrollment; // reuse the same input field
    } else {
      payload.enrollment = Value.enrollment;
    }

    const response = await axios.post("https://engipa-1.onrender.com/login", payload);

    localStorage.setItem("id", response.data.id);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);

    if (response.data.role === "admin") {
      Navigate("/PostPaper");
    } else {
      Navigate("/FindPaper");
    }
  } catch (e) {
    alert(e.response?.data?.message || "login failed");
    console.error(e.response?.data || e.message);
  }
};
  return (
     <div className="Home-parent">
         {/* <!-- LEFT --> */}
        <div className="main-left-div">
          <div className="img-div">
            <img src="https://i1.pickpik.com/photos/294/960/948/university-student-graduation-photo-hats-preview.jpg" alt="Banner" />
          </div>
        </div>

        {/* <!-- RIGHT --> */}
        <div className="main-right-div">
          <div className="loginDiv">
            <h1>Login</h1>

            <form className="loginForm" onSubmit={Submit}>
              {/* <!-- IMPORTANT: value must match backend role --> */}
           <select required name="role" value={Value.role || ""} onChange={Change}
>
  <option value="" disabled>Select Role</option>
  <option value="admin">Admin</option>
  <option value="user">Student</option>
</select>

              <input
                type="text"
                placeholder="Username"
                id="loginUsername"
                name="enrollment"
                required
                value={Value.enrollment}
                onChange={Change}
              />
              <input
                type="password"
                placeholder="Password"
                id="loginPassword"
                name="password"
                required
                value={Value.password}
                onChange={Change}/>

              <button type="submit">
                Login
                </button>
            </form>

            <div className="login-div-register-forgot">
            
              <Link to="/AdminRegister" >Forgot Password?</Link>
              <Link to="/Register">Create new account</Link>
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default MainHome

