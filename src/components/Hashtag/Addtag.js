import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import './Addtag.css';
import Button from '../Button/Button';
import '../../w3.css';

const addtag = (props) => {

    return (
        <Aux>
        <div className='w3-container' style={{marginTop:'2px', marginBottom:'2px', alignItems:'left'}}>
        <input onChange={props.tagHandler} value={props.inputValue} className='w3-input w3-card-2' type='text' style={{display: 'inline-flex', marginTop: '2px', marginBottom:'2px'}} placeholder="Add a new tag..."></input>
        <Button btnType={props.btnType} clicked={props.addTagClickHandler}>Add Tag</Button>
        </div>
        </Aux>
    );
};

export default addtag;