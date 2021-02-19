// Imports
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import banner from './images/loginBanner.jpg'

// Views
// import Index from './views/index.js'
import Board from './views/boards.js'
import Auth from './views/auth.js'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Auth} />
        <Route exact path="/register" component={Auth} />
        <Route exact path="/boards" component={Board} />
      </Switch>
    </BrowserRouter>
  );
};