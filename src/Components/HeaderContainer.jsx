import React, { useState } from "react";
import "../Styles/HeaderContainer.css";

function HeaderContainer() {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <h1 className="logo">
          <i className="fa-brands fa-spotify"></i>
          <span>ARRA</span>
        </h1>
      </div>
      <div className="user-container">
        <h1>
          <span className="user-icon" onClick={toggleOptions}>
            <i className="fa-solid fa-user"></i>
          </span>
        </h1>
        {isOptionsVisible && (
          <div className="options-container">
            <ul className="options-list">
              <li>Account</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderContainer;
