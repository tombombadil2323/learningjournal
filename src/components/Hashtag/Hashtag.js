import React from 'react';
import './Hashtag.css';
import Aux from '../../hoc/Aux/Aux';

const hashtag = (props) => {

    return (
        <Aux>
        <p></p>
        <div className='Tag' style={{marginTop:'0px', marginBottom:'0px'}}>
        This is an old Tag</div>
        <div className='material-icons'>delete_forever</div>
        
        </Aux>
    );
};

export default hashtag;