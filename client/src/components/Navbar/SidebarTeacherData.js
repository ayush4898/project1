import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
export const SidebarTeacherData=[
    {
        title:'Registration Forms',
        path:'/',
        icon:<DescriptionIcon />,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:<AccountBoxIcon />,
        cName:'nav-text'
    },
    {
        title:'Add User',
        path:'/addNewUser',
        icon:<PersonAddIcon />,
        cName:'nav-text'
    },
    {
        title:'Change Password',
        path:'/changePassword',
        icon:<LockOpenIcon />,
        cName:'nav-text'
    },
    {
        title:'Search',
        path:'/search',
        icon:<SearchIcon />,
        cName:'nav-text'
    },
];