import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <h2>Distance App</h2>
        <Switch>
          <Route exact path='/results/:startingPoint?/:endingPoint?/:date?/:passengers?' component={SearchResults} />
          <Route exact path='/:startingPoint?/:endingPoint?/:date?/:passengers?' component={SearchForm} />
        </Switch>
      </Router>
    </div>
  )
};

export default App;