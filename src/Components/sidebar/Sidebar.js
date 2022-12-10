import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import DashboardIcon from "../../Assets/icons/dashboard.svg";
import AddIcon from "../../Assets/icons/add.svg";
import { useAuthContext } from "../../hooks/useAuthContext";
import Avatar from "../Avatar/Avatar";

function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__imgBox">
          <Avatar src={user.photoURL} />
        </div>
        <div className="sidebar__userName">Hey {user.displayName}</div>
      </div>
      <div className="sidebar__links">
        <NavLink to="/" className="sidebar__link">
          <img src={DashboardIcon} alt="Dash board icon" />{" "}
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/create" className="sidebar__link">
          <img src={AddIcon} alt="Add icon" /> <span>Create Project</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
