import React from "react";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { SidebarIcon } from "./SidebarIcon";

export const Sidebar: React.FC = () => {
    return (
        <div className="Sidebar">
            <SidebarIcon/>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} className="row" onClick={() => { window.location.pathname = val.link; }}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
