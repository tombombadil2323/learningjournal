import React from 'react';
import './JournalTitle.css';
import '../../../w3.css';

const journalTitle = (props) => {

    return (
        <div className='w3-container'>
            <textarea className = 'JournalTitle w3-input w3-card-2' type='text' onChange ={props.changedTitle} value = {props.text} placeholder="Give your learning experience a catchy title"/> 
        </div>
    );
};

export default journalTitle;