import { useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../images/logo1.png";
import Search from '../heropage/Search';


const NavBar = () => {
  const navRef = useRef();
  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  const navigate = useNavigate();
  return (
    <div className="minihead">
      <div className="mylogo1">
        <img className="mylogo" alt="logo" src={logo} />
      </div>

      <button className="nav-btn" onClick={showNavBar}>
        <FaBars className="Fabars" />
      </button>

      <nav className="header-nav" ref={navRef}>
        <a href="/" className="nav-link">Home</a>
        <a href="AboutUS" className="nav-link">About US</a>
        <a href="ContactUs" className="nav-link">Contact Us</a>
        <a href="SignIn" className="nav-link">Sign In</a>
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FaTimes />
        </button>
      </nav>

      <div>
      <Search />
      </div>
    </div>
    
  );
};

export default NavBar;
