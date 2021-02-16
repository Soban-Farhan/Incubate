// Imports
import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom'

// Views
// import Index from './views/index.js'
import Login from './views/login.js'
import Register from './views/register.js'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Index} /> */}
        <Route exact path="/" component={Register} />
        <Route exact path="/Identity/Account/Login" component={Login} />
        <Route exact path="/Identity/Account/Register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};