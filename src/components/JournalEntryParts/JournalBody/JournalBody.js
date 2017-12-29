import React from 'react';
import './JournalBody.css';
import '../../../w3.css';

const JournalBody = (props) => {

    return (
        <div className='w3-container'>
            <textarea style={{height:'50vh'}} className = 'w3-input w3-card-2 JournalBody' type='text' onChange ={props.changedBody} value = {props.text} placeholder="Capture your findings or reflect on your learning journey... You can use markdown to style your entries."/> 
        </div>
    );
};

export default JournalBody;