//BACKLOG
//DONE delete items button
//DONE check binding of handlers
//DONE refactor object to array code
//DONE add routes
//DONE add sidebar
//DONE add authorisation
//DONE pimp design
//DONE increase security
//DONE add status texts
//DONE 'remove' entry acknowledgement
//DONE click to expand tesxt
//DONE remove button shading
//DONE change loading status
//DONE conditional change of height of title 
//DONE add impressum
//add hashtags
//DONE add markdown
//add search
//add sharing
//DONE add github and integrate git
//DONE add git and learn
//rebuild database structure to have seperate folders beneath userfolder


import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';

class App extends Component {

  render() {
    return (
      <Aux>
          <Layout />
      </Aux>
       
    );
  }
}

export default App;
