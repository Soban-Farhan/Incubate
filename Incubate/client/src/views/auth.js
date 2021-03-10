import React, { Component } from 'react';
import '../css/master.css';
import banner from '../images/tester-min.png'
import Login from './login.js'
import Register from './register.js'

import { getSessionCookie } from '../includes/function'

import { Route, Switch, BrowserRouter } from 'react-router-dom'

class Auth extends Component {
    
    componentDidMount() {
        if (getSessionCookie() !== null) {
            console.log(getSessionCookie())
            window.location = "/boards"
        }
    }

    render() {
        return (
            <div className="main-content" style={ {
                height: "100vh",
                backgroundImage: "url(" + banner + ")"
            } }>
                <Route path="/login" render={() => <Login /> } />
                <Route path="/register" render={() => <Register /> } />
            </div>
        )
    }
}

export default Auth;