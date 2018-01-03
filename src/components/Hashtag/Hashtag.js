import React from 'react';
import './Hashtag.css';
import Aux from '../../hoc/Aux/Aux';

const hashtag = (props) => {

    return (
        <Aux>
        <div className='Tag' style={{marginTop:'2px', marginBottom:'2px'}}>
        {props.tagName}</div>
        </Aux>
    );
};

export default hashtag;