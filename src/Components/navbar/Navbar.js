import React from "react";
import "./Navbar.css";
import Logo from "../../Assets/logo/logo.png";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const handleClick = async () => {
    await logout();
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar__logoBox">
        <img src={Logo} alt="Company Logo" className="navbar__logoImg" />
        <h2 className="navbar__navHeading">Vadnam</h2>
      </Link>
      <div className="navbar__links">
        {!user && (
          <>
            <Link to="/login" className="navbar__link">
              Login
            </Link>
            <Link to="/signup" className="navbar__link">
              Signup
            </Link>
          </>
        )}
        {user && (
          <>
            {!isPending && (
              <button className="primary__btn" onClick={handleClick}>
                Logout
              </button>
            )}
            {isPending && (
              <button className="primary__btn" disabled onClick={handleClick}>
                Loging out..
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
