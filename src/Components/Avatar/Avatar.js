import React from "react";
import "./Avatar.css";

function Avatar({ src }) {
  return <img className="avatar__img" src={src} alt="Avatar of users" />;
}

export default Avatar;
