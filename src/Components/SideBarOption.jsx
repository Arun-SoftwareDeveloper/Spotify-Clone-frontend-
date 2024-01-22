// SidebarOption.js

import React from "react";

const SidebarOption = ({ icon, title }) => {
  return (
    <div className="sidebarOption">
      {icon && <div className="sidebarOption__icon">{icon}</div>}
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;
