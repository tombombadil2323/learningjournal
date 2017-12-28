import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import EntryView from '../EntryView/EntryView';
import JournalEntry from '../../containers/JournalEntry/JournalEntry';
import JournalEntryPreview from '../../components/JournalEntryPreview/JournalEntryPreview';
import About from '../About/About';

const loggedInRoutes = (props) => {
    return (
        <Aux>
            <Switch>
                <Route 
                    path='/' 
                    exact 
                    render={({location, history, match})=> 
                    <JournalEntry user={props.user} location={location} history={history} match={match}/>
                    }
                />
                <Route 
                    path='/newentry' 
                    exact 
                    render={({location, history, match})=> 
                    <JournalEntry user={props.user} location={location} history={history} match={match}/>
                    }
                />
                <Route 
                    path='/journalentrypreviewlist' 
                    exact 
                    render={({location, history, match})=> 
                    <JournalEntryPreview user={props.user} location={location} history={history} match={match}/>
                    }
                />
                <Route 
                    path='/journalentryview'
                    exact
                    render={({location, history, match})=>
                    <EntryView user={props.user} location={location} history={history} match={match}/>
                    }
                    />
                <Route path='/about' render={({location, history, match})=> 
                    <About/>
                    }
                />
                <Route render={({location, history, match})=> 
                    <JournalEntry user={props.user} location={location} history={history} match={match}/>
                    }
                />
            </Switch>
        </Aux>
    );
}

export default loggedInRoutes;