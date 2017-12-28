import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import LogInText from '../../components/LogInText/LogInText';
import LogOutText from '../../components/LogOutText/LogOutText';
import WelcomeText from '../../components/WelcomeText/WelcomeText';
import About from '../../components/About/About';

const loggedOutRoutes = (props) => {
    return (
        <Aux>
            <Switch>
              <Route path='/' exact render={()=><WelcomeText/>}/>
              {props.showLogInText ?
                <LogInText/>
              :
                null
              }
              <Route path='/logout' render={({location, history, match})=> 
                <LogOutText/>
              }/>
              <Route path='/newentry' render={({location, history, match})=> 
                <LogInText/>
              }/>
               <Route path='/about' render={({location, history, match})=> 
                <About/>
              }/>
              <Route render={({location, history, match})=> 
                <WelcomeText/>
              }/>
            </Switch>
          </Aux>
    );
}

export default loggedOutRoutes;


