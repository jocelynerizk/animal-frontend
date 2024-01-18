import React from 'react';
import location from "../../Svgs/location-white.svg";
import call from "../../Svgs/call-white.svg";
import emailIcon from "../../Svgs/email-white.svg";
import linkedin from "../../Svgs/linkedin-white.svg";


import './Footer.css';

const Footer = () => {
  const linkedinUrl = 'https://www.linkedin.com/in/jocelyne-rizk/'; // Remplacez ceci par l'URL de votre profil LinkedIn
  const email = 'dev.jocelyne.rizk@isae.edu.lb';

  return (
    <footer>
      <div className="footer-container">
        <p className="footer-titles">About</p>
        <div className="big-div-info">
          <div className="info info1">
            <img src={location} className="svgs" alt="Location Icon" />
            <p className="get-in-info">Beirut, Lebanon </p>
          </div>

          <div className="info info1">
            <img src={call} className="svgs" alt="Call Icon" />
            <p className="get-in-info"> +961 03 577 105</p>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <p className="footer-titles">Information</p>
        <ul className="information-ul">
          <li className="information-li">
            <a href="/">Home</a>
          </li>
          <li className="information-li">
            <a href="/AboutUs">About US</a>
          </li>
          <li className="information-li">
            <a href="/ContactUs">Contact US</a>
          </li>


        </ul>
      </div>

      <div className="footer-container f1">
        <p className="footer-titles">Social Links</p>
        <div className="social-container">
          <img src={linkedin} className="svgs foot-svg" alt="LinkedIn Icon" onClick={() => window.open(linkedinUrl, '_blank')} />
          </div>
          <div className="social-container">
          <img src={emailIcon} className="svgs foot-svg" alt="Email Icon" onClick={() => window.open(`mailto:${email}`, '_blank')} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
