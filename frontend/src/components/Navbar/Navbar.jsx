import React from 'react'
import {Link} from 'react-router-dom'

import logo from './EngiPa.png';

const Navbar = () => {
  return (
    <div className="Navbar-parent">
      <div className="logo-div">
       <img src={logo} alt="EngiPa-logo"/>
      </div>

      <div className="links-div">
        <Link to="/"  className="nav-links">Home</Link>
      <Link to="/About-us" className="nav-links">About Us</Link>
      <Link to="/Contact-us" className="nav-links">Contact Us</Link>

      </div>
    </div>
  )
}

export default Navbar
