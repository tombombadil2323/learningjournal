import React, { Component } from 'react';
import './EntryView.css';
import '../../w3.css';
import JournalTitle from '../JournalEntryParts/JournalTitle/JournalTitle';
import JournalBody from '../JournalEntryParts/JournalBody/JournalBody';
import firebase from '../../javascripts/firebase';
import { Link } from 'react-router-dom';
import Journal from '../Journal/Journal';
import Button from '../Button/Button';
import Aux from '../../hoc/Aux/Aux';
import Remarkable from 'remarkable';
import Hashtag from '../Hashtag/Hashtag';
import Addtag from '../Hashtag/Addtag';

class EntryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entryID: "",
            currentTitle: '',
            currentBody: '',
            prevTitle: '',
            prevBody: '',
            viewCurrentTitle: '',
            viewCurrentBody: '',
            date:'',
            editToggle: false,
            removeCheckSet: false,
            prevTags:false,
            tags: [],
            currentTag: '',
            allTags: [],
        }
    }
    componentDidMount = () => {
        this.setState({entryID:this.props.location.state.entryID});
        //gets data of user from database and sets state
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.on("value", snapshot => {
            let entries = snapshot.val(); 
            let newState = [];
            let allTags = [];
            //applying Remarkable library to generate markdown
            let markDownEngine = new Remarkable();
            markDownEngine.set({linkify: true,});
            //find entry that was clicked in preview
            for (let entry in entries) {    
                if (entry === this.props.location.state.entryID){
                    //protect against undefined arrays in case the entry has not tags
                    if (typeof entries[entry].tags !== 'undefined'){
                    newState=entries[entry].tags;
                    }
                    //set state from entry values
                    this.setState({
                        currentTitle: entries[entry].title,
                        currentBody: entries[entry].body,
                        prevTitle: entries[entry].title,
                        prevBody: entries[entry].body,
                        viewCurrentTitle: markDownEngine.render(entries[entry].title),
                        viewCurrentBody: markDownEngine.render(entries[entry].body),
                        date: entries[entry].date,
                        tags: newState,
                    });
                }
                if (entries[entry].tags && entries[entry].tags.length){
                    let tags = entries[entry].tags;
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

    //sets state with title inputs
    titleHandler = (event) => {
        this.setState({currentTitle: event.target.value});
    };

    //sets state with body inputs
    bodyHandler = (event) => {
        this.setState({currentBody: event.target.value});
    };

    editToggleClickHandler = () =>{
        this.setState((prevState)=>{
           return {editToggle : !prevState.editToggle};
        });
    }
    //for button sending the new entry
    buttonClickHandler = () => {
        if (this.state.prevTitle === this.state.currentTitle && this.state.prevBody === this.state.currentBody){
            if (this.state.prevTags === true){
                //push inputs from textareas to database
                const rootRef = firebase.database().ref().child('journalentries');
                const itemRef = rootRef.child(this.props.user.uid);
                const specificRef= itemRef.child(this.state.entryID);
                specificRef.update({
                    title: this.state.currentTitle,
                    body: this.state.currentBody, 
                    lastUpdateDate: Date().toString(),
                    tags: this.state.tags,
                });
                this.props.history.push('/journalentrypreviewlist');
            }
            return;
        }
        //push inputs from textareas to database
        const rootRef = firebase.database().ref().child('journalentries');
        const itemRef = rootRef.child(this.props.user.uid);
        const specificRef= itemRef.child(this.state.entryID);
        specificRef.update({
            title: this.state.currentTitle,
            body: this.state.currentBody, 
            lastUpdateDate: Date().toString(),
            tags: this.state.tags,
        });
        this.props.history.push('/journalentrypreviewlist');
    }
    //removes entry from database
    removeEntry  = (entryId)=> {
        if (!this.state.removeCheckSet) {
            return null;
        }
        const entryRef = firebase.database().ref(`/journalentries/${this.props.user.uid}/${entryId}`);
        entryRef.remove();
        this.props.history.push('/journalentrypreviewlist');
    }
    //toggles the removeCheckSet state
    removeCheckHandler = () => {
        this.setState((prevState)=>{
            return {removeCheckSet: !prevState.removeCheckSet};
        });
    }

    //update currentTag in state based on value entered in new tag input field
    tagHandler= (event) => {
        this.setState({currentTag: event.target.value});
    };
    //updates the tags array in state with the currentTag value if the add tag button is clicked
    addTagClickHandler = ()=> {
        if (!this.state.currentTag.length) {
            return;
        }
        this.setState((prevState)=>{
            let newState = [];
            newState = prevState.tags;
            newState.push(this.state.currentTag);
            return {tags : newState, 
                    currentTag:'', 
                    prevTags: true};
        });
    };
    //add or remove toggle, connected to tags-state if the displayed hashtag is clicked 
    tagClickToggleHandler = (tagName) => {
        if (this.state.tags.indexOf(tagName) > -1){
            this.setState((prevState) => {
                let newState = [];
                newState = prevState.tags;
                newState.splice(newState.indexOf(tagName),1);
                return {tags: newState, 
                        prevTags: true};
            });
        }
        else {
            this.setState((prevState) => {
                let newState = [];
                newState = prevState.tags;
                newState.push(tagName);
                return {tags: newState, 
                        prevTags: true};
            });
        }
    };
    render(){
        //formats the entry sending button 
        const saveButtonStyleType = () => {
            let buttonStyle = 'saveempty';
            if (this.state.currentTitle.length !== this.state.prevTitle.length || this.state.currentBody.length !== this.state.prevBody.length || this.state.prevTags === true){
                buttonStyle ='save';
            }
            return buttonStyle;
        };
        //formats the remove entry button 
        const removeButtonStyleType = () => {
            let buttonStyle = 'removeempty';
            if (this.state.removeCheckSet ===true){
                buttonStyle='remove';
            }
            return buttonStyle;
        };
        //prepares the journal to be shown in view mode
        let entryViewPrep =()=>{
            return (
                <Journal
                    entryID={this.state.entryID}
                    title ={this.state.viewCurrentTitle} 
                    body={this.state.viewCurrentBody} 
                    date={this.state.date}
                    tags = {this.state.tags}
                    titleStyle={{
                        overflow: 'hidden',
                        whiteSpace: 'pre-wrap',
                        textAlign:'left',
                        height: '100%',
                        fontWeight: 'bold',
                    }}
                />
            )
        }
        // calls the prepared Journal for rendering
        let entryView = entryViewPrep();
        //displays the tags in edit mode as no Journal is used there
        const entryEditTags = this.state.tags.map((tag, index)=>{
            return <Hashtag tagName={tag} key={tag+index} tagStyle='active' clickedTag={this.tagClickToggleHandler}/>                   
        });
        //formats the tag button
        const tagButtonStyleType = () => {
            let buttonStyle = 'tagempty';
            if (this.state.currentTag.length > 0){
                buttonStyle ='tag';
            }
            return buttonStyle;
        };
        // //renders all new tags
        let displayTags = this.state.allTags.map((val, index) => {
            return (
            <Hashtag tagName={val} key={index} clickedTag={this.tagClickToggleHandler}/>
            );            
            } 
        );
        return (
                <Aux >
                    {this.state.editToggle ?
                        <Aux>
                            <div align='center' style={{marginTop: '70px', marginBottom: '30px'}}>
                                <div className='w3-container w3-card-4 w3-light-grey ' style={{maxWidth: '1000px', paddingTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>
                                    <JournalTitle changedTitle ={this.titleHandler} text = {this.state.currentTitle} />
                                    <JournalBody changedBody = {this.bodyHandler} text = {this.state.currentBody}/>
                                    {entryEditTags}
                                    <Addtag btnType={tagButtonStyleType()} addTagClickHandler={this.addTagClickHandler} tagHandler={this.tagHandler} inputValue={this.state.currentTag}/>
                                    <div>{displayTags}</div>
                                    <div className='w3-container' style={{display: 'block'}}>                                            
                                        <div style={{margin:'5px', display: 'inline-block'}}>
                                            <Button clicked={this.buttonClickHandler} btnType={saveButtonStyleType()}>Update</Button>
                                        </div>                                             
                                        <div style={{margin:'5px', display: 'inline-block'}}>
                                            <Link to={{
                                                pathname:'/journalentrypreviewlist',
                                                }} 
                                                style={{textDecoration:'none'}}>
                                                    <Button btnType='back'>Back</Button>
                                            </Link>
                                        </div>
                                        <br/>
                                        <div style={{margin:'5px', display: 'inline-block' }}>
                                            <Button clicked={() => this.removeEntry(this.state.entryID)} btnType={removeButtonStyleType()}>Remove</Button>
                                            <label style={{margin:'10px'}}>Sure?</label>
                                            <input type='checkbox' onChange={this.removeCheckHandler}/>
                                        </div>      
                                    </div>                                                                      
                                </div>
                            </div>
                        </Aux>                            
                    :
                        <Aux>
                            <div align='center' style={{marginTop:'70px', minHeight:'100%', marginBottom: '30px'}}>
                                <div className='w3-card-4 w3-light-grey' align='center' style={{paddingTop:'2px', paddingBottom:'2px', maxWidth: '1000px'}}>
                                    <div onClick={this.editToggleClickHandler}>
                                        {entryView}
                                    </div>
                                    <div className='w3-container' style={{display: 'block'}}>                                                                                  
                                                <div style={{margin:'5px', display: 'inline-block'}}><Button clicked={this.editToggleClickHandler} btnType='edit'>Edit</Button></div>
                                                <div style={{margin:'5px', display: 'inline-block'}}><Link to={{
                                                    pathname:'/journalentrypreviewlist',
                                                    }}
                                                    style={{textDecoration:'none'}}>
                                                        <Button btnType='back'>Back</Button>
                                                    </Link>
                                                </div>       
                                    </div>                    
                                </div>
                            </div>                                
                        </Aux>              
                    }
            </Aux>  
        );
    }
};

export default EntryView;