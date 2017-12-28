import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItem/NavigationItem.css';
import Aux from  '../../../hoc/Aux/Aux';

const navigationItems = (props) => (
    <Aux>
        {props.user ?
            <ul className='NavigationItems'>
                <NavigationItem link="/newentry" exact>New Entry</NavigationItem>
                <NavigationItem link="/journalentrypreviewlist">Journal Entries</NavigationItem>
                <NavigationItem link="/logout" exact click={props.logout}>Log Out  <img alt='' height='20px' src={props.user.photoURL} /></NavigationItem>                
            </ul>
            :
            <ul className='NavigationItems'>
                <NavigationItem link="/newentry" exact click={props.login}>Log In </NavigationItem>
            </ul>
        }
    </Aux>
    
);

export default navigationItems;