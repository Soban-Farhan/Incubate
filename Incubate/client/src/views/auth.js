import React, { Component } from 'react';
import '../css/master.css';
import banner from '../images/tester-min.png'
import Login from './login.js'
import Register from './register.js'


import { Route, Switch, BrowserRouter } from 'react-router-dom'

class Auth extends Component {

    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="main-content" style={ {
                height: "100vh",
                backgroundImage: "url(" + banner + ")"
            } }>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" render={() => <Login /> } />
                        <Route path="/register" render={() => <Register /> } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Auth;