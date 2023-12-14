import React from "react";
import { Link } from "react-router-dom";

const Header = ({ handleLogout }) => {
  return (
    <>
      <header>
        <div>
          <Link to={"/"}>
            <button className="headerBtn backBtn">
              <img src="/assets/home.png" alt="back" className="backLogo" />
            </button>
          </Link>
        </div>

        <div className="heading">Result Management System</div>
        <div>
          {handleLogout ? (
            <button className="headerBtn logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="headerBtn logoutBtn">
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
