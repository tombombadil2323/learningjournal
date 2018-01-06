import React, { Component } from 'react';
import './Journal.css';
import Aux from '../../hoc/Aux/Aux';
import '../../w3.css';
import Hashtag from '../Hashtag/Hashtag';        

class Journal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags:[],
        };
    }
    componentDidMount(props){
        if (typeof this.props.tags !== 'undefined'){
            this.setState({tags: this.props.tags});
        }
    }
    componentWillReceiveProps(nextProps) {
        if (typeof this.props.tags !== 'undefined'){
            this.setState({tags: nextProps.tags});
        }
    }
    cleanArray = () => {
        let tagArray = [];
        if (this.state.tags.length > 0){
            tagArray = Array.from(this.state.tags); 
            return tagArray;
        }
        else return tagArray;   
    }

    render() {
        let arr = this.cleanArray();
        let hashtags = arr.map((tag, index) => {
            return (
                <Hashtag tagName={tag} key={tag+index} tagStyle='display' clickedTag={()=>null}/>                   
            );
        });
        return (
            <Aux>
            <div className='w3-container w3-panel w3-card w3-sand Journal' style={{height: '100%'}}>
                    <div className = 'w3-container w3-opacity'>{this.props.date}</div>
                    <div className = 'w3-container' style={this.props.titleStyle} dangerouslySetInnerHTML={{__html: this.props.title}}>
                    </div>
                    <div 
                        className = 'w3-container EntryView' 
                        style={{ 
                            overflow: 'hidden',
                            whiteSpace: 'pre-wrap',
                            textAlign:'left',
                            height: '100%',
                            }}
                            dangerouslySetInnerHTML={{__html: this.props.body}}        
                    >
                    </div>
                    {hashtags}
                </div>        
            </Aux>
            );        
    }
      
}

export default Journal;