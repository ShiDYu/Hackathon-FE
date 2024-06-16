import { link } from "fs";
import { title } from "process";
import React from "react";  
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

export const SidebarData = [
    {
        title: "ホーム",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "プロフィール",
        icon: <AccountCircleIcon/>,
        link: "/profile"
    },
    {
        title: "ツイート",
        icon: <ControlPointIcon/>,
        link: "/create-tweet"
    },
    {
        title:"ログアウト",
        icon: <LogoutIcon/>,
        link: "/logout"
    }

];