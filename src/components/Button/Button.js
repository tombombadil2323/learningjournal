import React from 'react';
import './Button.css';
import '../../w3.css';

const button = (props) => {

    let btnStyleSelector = ()=>{
        let btnStyle = '';
        switch (props.btnType){
            case ('save'):
                btnStyle = 'Button Save';
                break;
            case ('saveempty'):
                btnStyle = 'Button SaveEmpty';
                break;
            case ('edit'):
                btnStyle = 'Button Edit';
                break;
            case ('back'):
                btnStyle = 'Button Back';
                break;
            case ('remove'):
                btnStyle = 'Button Remove';
                break;
            case ('removeempty'):
            btnStyle = 'Button RemoveEmpty';
            break;
            case ('tag'):
                btnStyle = 'Button TagButton';
            break;
            default: 
                btnStyle = 'Button';
                break;
        } 
        return btnStyle;
    }
    return (
        <button className = {btnStyleSelector() + ' w3-btn'} onClick={props.clicked}>{props.children}</button>
    );
}


export default button;