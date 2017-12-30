import React, { Component } from 'react';
import './JournalEntry.css';
import '../../w3.css';
import Aux from '../../hoc/Aux/Aux';
import JournalTitle from '../../components/JournalEntryParts/JournalTitle/JournalTitle';
import JournalBody from '../../components/JournalEntryParts/JournalBody/JournalBody';
import Button from '../../components/Button/Button';
import firebase from '../../javascripts/firebase';
import Hashtag from '../../components/Hashtag/Hashtag';
import Addtag from '../../components/Hashtag/Addtag';


class JournalEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTitle: '',
            currentBody: '',
            currentTag: '',
            tags:[],
            dataSnapshot: "",
        }
    }
    componentDidMount = (props) => {
        
    };

    //handler for button sending the new entry
    buttonClickHandler = () => {
        if (!this.state.currentTitle.length && !this.state.currentBody.length) {
            return;
        }
        //push inputs from textareas to database
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.push({
            title: this.state.currentTitle,
            body: this.state.currentBody, 
            date: Date().toString(),
            tags: this.state.tags,
        });
        //empties the textareas
        this.setState({
            currentTitle:'',
            currentBody:'',
        });
        this.props.history.push('/journalentrypreviewlist');
    }
    //sets state with title inputs
    titleHandler = (event) => {
        this.setState({currentTitle: event.target.value});
    };
    //sets state with body inputs
    bodyHandler = (event) => {
        this.setState({currentBody: event.target.value});
    };

    tagHandler= (event) => {
        this.setState({currentTag: event.target.value});
    };

    addTagClickHandler = ()=> {
        if (!this.state.currentTag.length) {
            return;
        }
        // const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}/hashtags`);
        this.setState((prevState)=>{
            let newState = [];
            newState = prevState.tags;
            newState.push(this.state.currentTag);
            return {tags : newState};
        }
    );
        this.setState({currentTag:''});
    };
    
    render (){
        //formats the entry sending button 
        const buttonStyleType = () => {
            let buttonStyle = 'saveempty';
            if (this.state.currentTitle.length > 0 || this.state.currentBody.length > 0){
                buttonStyle ='save';
            }
            return buttonStyle;
        };
       
        return (
            <Aux >
                   <div align='center' style={{marginTop: '70px'}}>
                            <div className='w3-container w3-card-4 w3-light-grey ' style={{maxWidth: '1000px', paddingTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>                           
                                <JournalTitle changedTitle ={this.titleHandler} text = {this.state.currentTitle}/>
                                <JournalBody changedBody = {this.bodyHandler} text = {this.state.currentBody}/>
                                <Addtag addTagClickHandler={this.addTagClickHandler} tagHandler={this.tagHandler} inputValue={this.state.currentTag}/>
                                <Button clicked={this.buttonClickHandler} btnType={buttonStyleType()}>Save Entry</Button>
                        </div>
                    </div>
            </Aux>
        );
    }
    
}  

export default JournalEntry;