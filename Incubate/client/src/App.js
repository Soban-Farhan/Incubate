// Imports
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { removeSessionCookie } from './includes/function'

// Views
// import Index from './views/index.js'
import Board from './views/board.js'
import Auth from './views/auth.js'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Auth} />
        <Route exact path="/register" component={Auth} />
        <Route exact path="/boards" component={Board} />
        <Route exact path="/logout" render={() => {
          removeSessionCookie()
          window.location = "/login"
        }}/>
      </Switch>
    </BrowserRouter>
  );
};