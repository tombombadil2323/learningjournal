import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = 'SideDrawer Close';
    if (props.open) {
        attachedClasses = 'SideDrawer Open';
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses} onClick={props.closed}>
                <nav>
                    <NavigationItems user={props.user} login={props.login} logout={props.logout}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;