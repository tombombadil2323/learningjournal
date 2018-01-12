import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Remarkable from 'remarkable';
import firebase from '../../javascripts/firebase';

import '../../w3.css';

import Journal from '../Journal/Journal';
import Aux from '../../hoc/Aux/Aux';
import Accordion from '../../hoc/Accordion/Accordion';


class JournalEntryPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: [],
            accordionToggle: false,
        }
    }
    componentDidMount() {
        //gets data of user from database and sets entry array
        const rootRef = firebase.database().ref(`journalentries/${this.props.user.uid}`);
        rootRef.on("value", snapshot => {
            //new simplified code:
            let entries = snapshot.val(); 
            let newState = [];
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
            }
            newState.reverse();
            this.setState({
                entry: newState
            });
        });
    }
    accordionClickToggle = ()=>{
        this.setState((prevState)=>{
            return {accordionToggle: !prevState.accordionToggle};
        });
        // this.setState((prevState)=>{
        //     return (prevState.panelMaxHeight === '100%'? {panelMaxHeight:'0'}: {panelMaxHeight: '100%'});
        // });
    };

    accordionDisplayToggle = ()=>{
        if (this.state.accordionToggle){
            return "Expanded";
        }
        else return "Accordion";
    };
    render() {
         //displays the list of entries with tags
         const joined = this.state.entry.map((entry)=>{            
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
        return (
            <Aux>
                <div align='center' style={{marginTop: '70px', marginBottom: '30px'}}>
                    <div style={{marginBottom: '5px'}}>
                        <Accordion 
                            accordionDisplayToggle={this.accordionDisplayToggle()} 
                            accordionClickToggle={this.accordionClickToggle}
                            accordionToggle={this.state.accordionToggle}
                            buttonText={'Filter by Tags...'}
                        >
                            Test
                        </Accordion>
                    </div>
                    <div style={{maxWidth: '1000px'}} align='center'>{joined}</div>
                </div> 
            </Aux>       
        );
    }
}

export default JournalEntryPreview;