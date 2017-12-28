import React from 'react';
import '../../../w3.css';
import {NavLink} from 'react-router-dom';
import './Footer.css';

const footer = (props) => {

    return (
        <div className='Footer'>
            <NavLink to='/about' style={{textDecoration:'none'}}>About</NavLink>
        </div>
        
    );
};

export default footer;