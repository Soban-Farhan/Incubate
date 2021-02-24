import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import '../../css/master.css'
import logo from '../../images/incuabte.png'
import { getSessionCookie } from '../../includes/function'

class Board extends Component {
    
  componentDidMount() {
      if (getSessionCookie() === null) {
          window.location = "/boards"
      }
  }

  render() {
    return (
      <>
        <div className="container-fluid p-0">
          <Navbar collapseOnSelect expand="sm" style={{ backgroundColor: "#202020" }} variant="dark">
            <Navbar.Brand href="#home"><img src={logo} alt="" width={150}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" />
              <Nav>
                <a href="/logout">
                  <button className="btn btn-outline-light btn-md font-karla">Log Out</button>
                </a>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default Board;