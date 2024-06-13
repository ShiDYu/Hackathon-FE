import React from "react";
import { SidebarData } from "./SidebarData";

export function Sidebar() {
    return (
        <div className = "Sidebar">
            <ul className="SidebarList"></ul>
                {SidebarData.map((val, key) => {
                    return (
                        <li key={key} className="row" onClick={() => {window.location.pathname = val.link;}}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    );
                })}
        </div>
    );
};