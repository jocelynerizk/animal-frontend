import React from "react";
import { Link } from "react-router-dom";
import '../css/PageNotFound.css'

const NoAccess = () => {
  return (
    <div className="not-found-container">
    <img src="Images/PageNotFound.png" className="" alt="not found" />
    <div className="flex-title-not-found">
      <h1 className="title-text-not-found">Ooooooops!</h1>
      <p className="subTitle-not-found"> You don't have access to this page</p>
      <div className="home-button-not-found">
        <Link to="/" className="btn-not">Go to Home </Link>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;
