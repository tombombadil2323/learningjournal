import React from 'react';
import Aux from '../../hoc/Aux/Aux';

const welcomeText = (props) => {
    return (
        <Aux>
            <div className = 'w3-light-grey w3-padding' align='center' style={{marginTop: '70px'}}>
                <h3>Welcome to your personal learning journal!</h3>
                <p>Please log in to capture or review your learnings.</p>
            </div>
        </Aux>
    );
}
export default welcomeText;