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
            allTags: [],
        }
    }
    componentDidMount = (props) => {
        //get tag data from database and write it to state
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.on("value", snapshot => {
            let userJournalEntries = snapshot.val(); 
            let allTags = [];
            for (let entry in userJournalEntries) {
                //check that there is a tag in the entry
                if (userJournalEntries[entry].tags && userJournalEntries[entry].tags.length){
                    let tags = userJournalEntries[entry].tags;
                    for (let tag in tags) {
                        allTags.push(tags[tag]);
                    }
                }
            }
            //remove duplicates from allTags
            let allUniqueTags = allTags.filter((tag, index, arr) => arr.indexOf(tag) === index);
            //write the list of all unique tags across all entries to state
            this.setState({
                allTags: allUniqueTags
            });
        });
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
        //renders all new tags
        let displayNewTags = this.state.tags.map((val, index) => {
            return (
            <Hashtag tagName={val} key={index} />
            );            
            } 
        );
        //renders the list of all tags
        let displayTags = this.state.allTags.map((val, index) => {
            return (
            <Hashtag tagName={val} key={index} />
            );            
            } 
        );
       
        return (
            <Aux >
                   <div align='center' style={{marginTop: '70px'}}>
                            <div className='w3-container w3-card-4 w3-light-grey ' style={{maxWidth: '1000px', paddingTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>                           
                                <JournalTitle changedTitle ={this.titleHandler} text = {this.state.currentTitle}/>
                                <JournalBody changedBody = {this.bodyHandler} text = {this.state.currentBody}/>
                                <Addtag addTagClickHandler={this.addTagClickHandler} tagHandler={this.tagHandler} inputValue={this.state.currentTag}/>
                                {displayNewTags}
                                {displayTags}
                                <Button clicked={this.buttonClickHandler} btnType={buttonStyleType()}>Save Entry</Button>
                        </div>
                    </div>
            </Aux>
        );
    }
    
}  

export default JournalEntry;