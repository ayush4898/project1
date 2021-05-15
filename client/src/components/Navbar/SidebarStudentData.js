import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockOpenIcon from '@material-ui/icons/LockOpen';
export const SidebarStudentData=[
    {
        title:'Registration Form',
        path:'/',
        icon: <DescriptionIcon />,
        cName:'nav-text'
    },
    {
        title:'Profile',
        path:'/profile',
        icon:<AccountBoxIcon />,
        cName:'nav-text'
    },
    {
        title:'Status',
        path:'/status',
        icon:<HowToRegIcon />,
        cName:'nav-text'
    },
    {
        title: 'Change Password',
        path: '/changePassword',
        icon:<LockOpenIcon />,
        cName:'nav-text'
    },

];