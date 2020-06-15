import React from 'react';
import {
    Router,
    Switch,
    Route,
  } from 'react-router-dom';

  import HomePage from './HomePage';
  import MeetingRoom from './MeetingRoom';

  import history from './history';

  const Routes = () => (
    <Router history={history}>
        <Switch>
          <Route path="/meeting">
            <MeetingRoom />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  );

  export default Routes;