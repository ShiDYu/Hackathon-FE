import { link } from "fs";
import { title } from "process";
import React from "react";  
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
];