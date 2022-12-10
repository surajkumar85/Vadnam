import "./AboutModel.css";

import React from "react";

function AboutModel({ handleClick }) {
  return (
    <div className="aboutModel__background" onClick={handleClick}>
      <div className="aboutModel__model">
        <p className="aboutModel__title">
          Project <strong>Vadnam</strong>
        </p>
        <p className="aboutModel__version">v 1.0.0</p>
        <p className="aboutModel__author">
          Made by <strong>Suraj</strong> with ❤️!!!
        </p>
        <p className="aboutModel__upcomingVersion">Next version is coming...</p>
        <ul className="aboutModel__listItems">
          <li className="aboutModel__item">Email Notification</li>
          <li className="aboutModel__item">Admin Area</li>
          <li className="aboutModel__item">Project Archives</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutModel;
