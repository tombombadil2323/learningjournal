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
        }
    }
    componentDidMount = () => {
        this.setState({entryID:this.props.location.state.entryID});
        //gets data of user from database and sets state
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.on("value", snapshot => {
            //new simplified code:
            let entries = snapshot.val(); 
            let markDownEngine = new Remarkable();
            markDownEngine.set({linkify: true,});
            for (let entry in entries) {    
                if (entry === this.props.location.state.entryID)
                {
                    this.setState({
                        currentTitle: entries[entry].title,
                        currentBody: entries[entry].body,
                        prevTitle: entries[entry].title,
                        prevBody: entries[entry].body,
                        viewCurrentTitle: markDownEngine.render(entries[entry].title),
                        viewCurrentBody: markDownEngine.render(entries[entry].body),
                        date: entries[entry].date,
                    })
                }
            }
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
        if (this.state.prevTitle === this.state.currentTitle && this.state.prevBody === this.state.currentBody) {
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
        });
        //empties the textareas
        this.setState({
            currentTitle:'',
            currentBody:'',
        });
        this.props.history.push('/journalentrypreviewlist');
    }
    removeEntry  = (entryId)=> {
        if (!this.state.removeCheckSet) {
            return null;
        }
        const entryRef = firebase.database().ref(`/journalentries/${this.props.user.uid}/${entryId}`);
        entryRef.remove();
        this.props.history.push('/journalentrypreviewlist');
    }
    removeCheckHandler = () => {
        this.setState((prevState)=>{
            return {removeCheckSet: !prevState.removeCheckSet};
        });
    }
        render(){
            //formats the entry sending button 
            const saveButtonStyleType = () => {
                let buttonStyle = 'saveempty';
                if (this.state.currentTitle.length !== this.state.prevTitle.length || this.state.currentBody.length !== this.state.prevBody.length){
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
            return (
                    <Aux >
                        {this.state.editToggle ?
                            <Aux>
                                <div align='center' style={{marginTop: '70px', marginBottom: '30px'}}>
                                    <div className='w3-container w3-card-4 w3-light-grey ' style={{maxWidth: '1000px', paddingTop:'10px', paddingLeft:'0px', paddingRight:'0px'}}>
                                        <JournalTitle changedTitle ={this.titleHandler} text = {this.state.currentTitle} />
                                        <JournalBody changedBody = {this.bodyHandler} text = {this.state.currentBody}/> 
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
                                            <Journal
                                                entryID={this.state.entryID}
                                                title ={this.state.viewCurrentTitle} 
                                                body={this.state.viewCurrentBody} 
                                                date={this.state.date}
                                                titleStyle={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'pre-wrap',
                                                    textAlign:'left',
                                                    height: '100%',
                                                    fontWeight: 'bold',
                                                }}
                                            />
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