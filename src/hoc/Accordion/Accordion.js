import React from 'react';
import Aux from '../Aux/Aux';
import './Accordion.css';


const accordion = (props) => {
    return (
        <Aux>
            <button className={props.accordionDisplayToggle} onClick={props.accordionClickToggle}><strong>{props.buttonText}</strong></button>
            <div className='Panel' style={props.accordionToggle ? {maxHeight:'2000px'}: {maxHeight:null}}>
                {props.children}
            </div>
        </Aux>
        
    );
}

export default accordion;