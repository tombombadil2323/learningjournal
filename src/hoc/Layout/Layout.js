import React, { Component } from 'react';
import './Layout.css';
import '../../w3.css';
import { withRouter } from 'react-router-dom';
import { auth, provider } from '../../javascripts/firebase';
import Header from '../../components/Navigation/Header/Header';
import LoggedInRoutes from '../../components/LoggedInRoutes/LoggedInRoutes';
import LoggedOutRoutes from '../../components/LoggedOutRoutes/LoggedOutRoutes';
import Footer from '../../components/Navigation/Footer/Footer';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showSideDrawer: false,
      showLogInText: false,
    };
  }
  componentDidMount =()=> {
    //picks up the login promise after redirect login
    auth.getRedirectResult().then((result) => {
      if (result.user !==null){
        const user = result.user;          
        this.setState({user: user});
      };
    });
    //sets the user if logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({user: user});
        } 
    });
  }
  //redirects to google login and sets user 
  loginHandler = () => {
    this.setState({
      showLogInText: true
    });
    auth.signInWithRedirect(provider);    
  }
  //logs out and updates user:null and cleans the entry array
  logoutHandler = ()=> {
      auth.signOut()
        .then(() => {
          this.setState({
            user: null,
            entry: [],
            showLogInText: false,
          });
        });
  }
  //
  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  } 

  sideDrawerToggleHandler = () => {
      this.setState( ( prevState ) => {
          return { showSideDrawer: !prevState.showSideDrawer };
      } );
  }

  render() {
    let showLogInText = this.state.showLogInText;
    let user = this.state.user;
    let showSideDrawer = this.state.showSideDrawer;
    return (
      <div className='w3-teal w3-container' style={{minHeight: '100vh'}}>
        <Header
          user={user} 
          login={this.loginHandler} 
          logout={this.logoutHandler} 
          drawerToggle={this.sideDrawerToggleHandler}
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        >
        </Header>
        {this.state.user ?
          <LoggedInRoutes user = {user}/>
        : 
          <LoggedOutRoutes showLogInText = {showLogInText}/>
          // <Aux>
          //   <Switch>
          //     <Route path='/' exact render={()=><WelcomeText/>}/>
          //     {showLogInText ?
          //       <LogInText/>
          //     :
          //       null
          //     }
          //     <Route path='/logout' render={({location, history, match})=> 
          //       <LogOutText/>
          //     }/>
          //     <Route path='/newentry' render={({location, history, match})=> 
          //       <LogInText/>
          //     }/>
          //     <Route render={({location, history, match})=> 
          //       <WelcomeText/>
          //     }/>
          //   </Switch>
          // </Aux>          
        }
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Layout);