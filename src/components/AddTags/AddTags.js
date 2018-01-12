import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Addtag from '../Hashtag/Addtag';
import './AddTags.css';


const addTags = (props) => (
    <Aux>
        <div>{props.displayNewTags}</div>
        <Addtag btnType={props.tagButtonStyleType} addTagClickHandler={props.addTagClickHandler} tagHandler={props.tagHandler} inputValue={props.currentTag}/>
        <div style={{marginTop:'10px'}}>{props.displayTags}</div>
        <hr className='HorizontalRuler'/>
    </Aux>
);

export default addTags;
