
import React from "react";
import Icon from "../images/Icon.png";
import "./SidebarIcon.css";

export function SidebarIcon() {
  return (
    <div className="SidebarIcon">
      <a href="/tweets">
      <img src={Icon} />
      </a>
    </div>
  );
}