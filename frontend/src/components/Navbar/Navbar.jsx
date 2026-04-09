import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

import logo from './EngiPa.png';



const Navbar = () => {

   const [isOpen, setIsOpen] = useState(false);

  const menuOpnes = () => {
    setIsOpen((prev) => !prev);
  };
  return (
     <>
    <div className="Navbar-parent">
      <div className="logo-div">
       <img src={logo} alt="EngiPa-logo"/>
      </div>

      <div className="links-div">
        <Link to="/"  className="nav-links">Home</Link>
      <Link to="/About-us" className="nav-links">About Us</Link>
      <Link to="/Contact-us" className="nav-links">Contact Us</Link>

      </div>
      <button className="menu-icon" onClick={menuOpnes}><GiHamburgerMenu /></button>
      
    </div>

    <div className={`links-div2 ${isOpen ? "open" : ""}`}>
  <Link to="/"  className="nav-links">Home</Link>
      <Link to="/About-us" className="nav-links">About Us</Link>
      <Link to="/Contact-us" className="nav-links">Contact Us</Link>

    </div>
    </>
  )
}

export default Navbar
