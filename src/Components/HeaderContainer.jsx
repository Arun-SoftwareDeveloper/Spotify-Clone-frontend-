// HeaderContainer.js

import React, { useState } from "react";
import "../Styles/HeaderContainer.css";

function HeaderContainer() {
  const [isUserHovered, setisUserHovered] = useState(false);

  const showOptions = () => {
    setisUserHovered(true);
  };

  const closeOptions = () => {
    setisUserHovered(false);
  };

  return (
    <div className="header-container container-fluid fixed-top bg-dark py-2">
      <div className="row">
        <div className="col-md-6 text-left">
          <h1 className="text-success">
            <i className="fab fa-spotify"></i> Spotify
          </h1>
        </div>
        <div className="col-md-6 text-right">
          <h1>
            <span
              className="user-icon text-light text-right"
              onMouseEnter={showOptions}
              //   onMouseLeave={closeOptions}
            >
              <i className="fa-solid fa-user"></i>
            </span>
          </h1>
          {isUserHovered && (
            <div className="hover-container bg-light p-2">
              <ul className="list-unstyled">
                <li>Account</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderContainer;
