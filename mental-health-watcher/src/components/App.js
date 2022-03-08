import React from 'react';
import './../App.css';
import WatchInfo from './WatchInfo';
import Header from './Heading';
import Signin from './Signin';
import { BrowserRouter as Router, Switch , Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/">
          <div className="container shadow">
            <WatchInfo />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;