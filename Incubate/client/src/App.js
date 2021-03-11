// Imports
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { getSessionCookie, removeSessionCookie } from './includes/function'

// Views
// import Index from './views/index.js'
import Board from './views/board/index.js'
import Auth from './views/auth.js'
import Tabs from "./views/board/tab/index.js"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Auth} />
        <Route exact path="/register" component={Auth} />
        <Route exact path="/boards" component={Board} />
        <Route exact path="/board/:boardID" component={Tabs} />
        <Route exact path="/logout" component={() => {
          if (getSessionCookie() !== null) {
            removeSessionCookie()
            window.location = "/login"
          } else {
            window.location = "/login"
          }
        }}/>
      </Switch>
    </BrowserRouter>
  );
};