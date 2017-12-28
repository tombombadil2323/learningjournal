import React from 'react';
//import './Header.css';
import Aux from '../../../hoc/Aux/Aux';
import '../../../w3.css';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

const header = (props) => {

    return (
        <Aux>
            <Toolbar
            user={props.user} 
            login={props.login} 
            logout={props.logout} 
            drawerToggle={props.drawerToggle}/>
            <SideDrawer 
                open={props.open}
                closed={props.closed}
                user={props.user} 
                login={props.login} 
                logout={props.logout}
            />
        </Aux>
    );
};

export default header;