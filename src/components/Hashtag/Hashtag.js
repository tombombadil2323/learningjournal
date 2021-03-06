import React, { Component } from 'react';
import './Hashtag.css';
import Aux from '../../hoc/Aux/Aux';

class Hashtag extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    activeSelector = () => {
        let tagStyle = '';
        switch (this.props.tagStyle) {
            case ('active'):
                tagStyle = 'Tag Active';
                break;
            case ('display'):
                tagStyle = 'Tag Display';
                break;
            default:
                tagStyle = 'Tag';
                break;
        }
        return tagStyle;
    };
    
    tagName = () => {
        this.props.clickedTag(this.props.tagName);
    };
    render() {
        return (
            <Aux>
            <div className={this.activeSelector()} style={{marginTop:'2px', marginBottom:'2px'}} onClick={this.tagName}>
            {this.props.tagName}</div>
            </Aux>
        );
    }
}

export default Hashtag;