import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './Addtag.css';

const addtag = (props) => {

    return (
        <Aux>
        <p></p>
        <div style={{marginTop:'0px', marginBottom:'0px'}}>
        <input type='text'style={{outerHeight:'10px'}}></input>
        <div className='material-icons MyGreen md-36' font>check_circle</div>
        </div>
        </Aux>
    );
};

export default addtag;