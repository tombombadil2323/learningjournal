import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Remarkable from 'remarkable';
import firebase from '../../javascripts/firebase';

import '../../w3.css';

import Journal from '../Journal/Journal';
import Aux from '../../hoc/Aux/Aux';
import Accordion from '../../hoc/Accordion/Accordion';
import Hashtag from '../Hashtag/Hashtag';


class JournalEntryPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: [],
            tags: [],
            activeTags: [],
            accordionToggle: false,
            activeTagEntry:[],
            activeTagToggle: false,
        }
    }
    componentDidMount() {
        //gets data of user from database and sets entry array
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.on("value", snapshot => {
            //new simplified code:
            let entries = snapshot.val(); 
            let newState = [];
            let allTags = [];
            //define and configure Remarkable Library
            let markDownEngine = new Remarkable();
            markDownEngine.set({linkify: true,});
            for (let entry in entries) {    
                newState.push({
                    entryID: entry,
                    title: markDownEngine.render(entries[entry].title),
                    body: markDownEngine.render(entries[entry].body),
                    date: entries[entry].date,
                    tags: entries[entry].tags,               
                });
                let tags = entries[entry].tags;
                    for (let tag in tags) {
                        allTags.push(tags[tag]);
                    }
            }
            newState.reverse();
            this.setState({
                entry: newState
            });
            let uniqueTags = allTags.filter((tag, index, arr) => arr.indexOf(tag) === index);
            this.setState({
                tags: uniqueTags
            });
        });
    }

    componentDidUpdate(prevProps, prevState){
        //executes if tags were updated
        if (this.state.activeTagToggle !== prevState.activeTagToggle){
            let activeTags = this.state.activeTags;
            let entries = this.state.entry;
            let activeTagEntry = [];
            entries.map((entry) => {
                if (typeof entry.tags !== 'undefined'){
                    activeTags.forEach((tag) => {
                        if (entry.tags.indexOf(tag[0]) !== -1){
                            activeTagEntry.push(entry);
                        }
                    });
                }
                return null;
            }); 
            activeTagEntry = activeTagEntry.filter((entry, index, arr) => arr.indexOf(entry) === index);
            this.setState({activeTagEntry, activeTagToggle:false});
        }
    }

    accordionClickToggle = ()=>{
        this.setState((prevState)=>{
            return {accordionToggle: !prevState.accordionToggle};
        });
    };

    accordionDisplayToggle = ()=>{
        if (this.state.accordionToggle){
            return "Expanded";
        }
        else return "Accordion";
    };
    //add or remove toggle, connected to tags-state if the displayed hashtag is clicked 
    tagClickToggleHandler = (tagName) => {
        if (this.state.tags.indexOf(tagName) > -1){
            this.setState((prevState)=>{
                let newTags = prevState.tags;
                let activeTag = newTags.splice(newTags.indexOf(tagName),1);
                let activeTags = prevState.activeTags;
                activeTags.push(activeTag);
                return ({
                    tags: newTags,
                    activeTags
                });
            });
        }
        else {
            this.setState((prevState)=>{
                let newTags = prevState.tags;
                let activeTags = prevState.activeTags;
                let deactiveTag = activeTags.splice(activeTags.indexOf(tagName),1);
                newTags.push(deactiveTag);
                return ({
                    tags: newTags,
                    activeTags
                });
            });
        }
        this.setState((prevState)=>{
            return {activeTagToggle: !prevState.activeTagToggle}
        });
    };
    render() {        
        //displays the list of entries with tags
        const joined = this.state.activeTagEntry.length > 0 ? 
            this.state.activeTagEntry.map((entry)=>{
                return (
                    <div key={entry.entryID}>
                        <div className='w3-card-4 w3-light-grey' align='center' style={{paddingTop:'2px', paddingBottom:'2px', maxWidth: '1000px'}}>
                            <Link to={{
                            pathname:'/journalentryview',
                            state:{entryID: entry.entryID}
                            }} style={{textDecoration:'none'}}>
                                <Journal
                                    entryID={entry.entryID}
                                    title ={entry.title} 
                                    date={entry.date.slice(0,16).toString()}
                                    tags={entry.tags}
                                    titleStyle={{        
                                        overflow: 'hidden',
                                        whiteSpace: 'pre-wrap',
                                        textAlign:'center',
                                        height: '100%',
                                        fontStyle: 'italic',
                                    }}
                                />                              
                            </Link>         
                        </div>
                        <p></p>                                                 
                    </div>
                );
            }) 
            : 
            this.state.entry.map((entry)=>{
                return (
                    <div key={entry.entryID}>
                        <div className='w3-card-4 w3-light-grey' align='center' style={{paddingTop:'2px', paddingBottom:'2px', maxWidth: '1000px'}}>
                            <Link to={{
                            pathname:'/journalentryview',
                            state:{entryID: entry.entryID}
                            }} style={{textDecoration:'none'}}>
                                <Journal
                                    entryID={entry.entryID}
                                    title ={entry.title} 
                                    date={entry.date.slice(0,16).toString()}
                                    tags={entry.tags}
                                    titleStyle={{        
                                        overflow: 'hidden',
                                        whiteSpace: 'pre-wrap',
                                        textAlign:'center',
                                        height: '100%',
                                        fontStyle: 'italic',
                                    }}
                                />                              
                            </Link>         
                        </div>
                        <p></p>                                                 
                    </div>
                );
            });
        //displays all active tags
        const displayAllActiveTags = this.state.activeTags.map((tag, index)=>{
            return (
                <Hashtag 
                    tagName={tag} 
                    key={index} 
                    clickedTag={this.tagClickToggleHandler}
                    tagStyle='active'/>
            );
            }
        );
        //displays all non active tags
        const displayAllTags = this.state.tags.map((tag, index)=>{
            return (
                <Hashtag 
                    tagName={tag} 
                    key={index} 
                    clickedTag={this.tagClickToggleHandler}/>
            );
            }
        );
        return (
            <Aux>
                <div 
                    align='center' 
                    style={{
                        marginTop: '70px', 
                        marginBottom: '30px'}}>
                    <div style={{
                            marginBottom: '5px', 
                            maxWidth: '1000px'}}>
                        <Accordion 
                            accordionDisplayToggle={this.accordionDisplayToggle()} 
                            accordionClickToggle={this.accordionClickToggle}
                            accordionToggle={this.state.accordionToggle}
                            buttonText={'Filter by Tags...'}>
                                {displayAllActiveTags}{displayAllTags}
                        </Accordion>
                    </div>
                    <div 
                        style={{maxWidth: '1000px'}} 
                        align='center'>
                            {joined}
                    </div>
                </div> 
            </Aux>       
        );
    }
}

export default JournalEntryPreview;