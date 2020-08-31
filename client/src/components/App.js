import React from 'react';
import Results from './Results';
import Details from './Details';
import Header from './layout/Header';
import {BrowserRouter, Route} from 'react-router-dom'


class App extends React.Component{
  render(){
    return(
      <div>
        <BrowserRouter>
          <Header/>
          <div>
            <Route path="/" exact component={Results}/>
            <Route path="/repo/:owner/:repo" exact component={Details}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
