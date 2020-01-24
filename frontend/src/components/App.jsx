import React, { Component } from 'react';
import SchoolList from './SchoolList';
import {Router, Route, Switch} from 'react-router-dom'
import history from '../history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Main />
        </div>
      </Router>
    );
  }
}



const Main = () => (
  <Switch>
    <Route exact path="/" component={SchoolList} />
    <Route exact path="/schools" component={SchoolList} />
  </Switch>
);

export default App;
