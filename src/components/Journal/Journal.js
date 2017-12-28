import React from 'react';
import './Journal.css';
import Aux from '../../hoc/Aux/Aux';
import '../../w3.css';

const Journal = (props) => {
    return (
        <Aux>
        <div className='w3-container w3-panel w3-card w3-sand Journal' style={{height: '100%'}}>
                <div className = 'w3-container w3-opacity'>{props.date}</div>
                <div className = 'w3-container' style={props.titleStyle}>
                        {props.title}
                </div>
                <div 
                    className = 'w3-container' 
                    style={{ 
                        overflow: 'hidden',
                        whiteSpace: 'pre-wrap',
                        textAlign:'left',
                        height: '100%',
                        }}>
                    {props.body}
                </div>
            </div>        
        </Aux>
        );          
};

export default Journal;