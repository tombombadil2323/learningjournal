import React from 'react';
import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggle} />
        <nav className='DesktopOnly'>
            <NavigationItems user={props.user} login={props.login} logout={props.logout}/>                           
        </nav>
        <h3 style={{whiteSpace:'nowrap'}}>Learning Journal</h3>
    </header>
);

export default toolbar;