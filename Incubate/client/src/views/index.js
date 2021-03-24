import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar, Modal } from 'react-bootstrap';

import { Link } from 'react-router-dom'

import '../css/master.css'
import logo from '../images/incuabte.png'
import postData, { getSessionCookie } from '../includes/function'

function Index() {
    return (
      <Container className="p-0" fluid>
        <Navbar collapseOnSelect expand="sm" style={{ backgroundColor: "#202020" }} variant="dark">
          <Navbar.Brand><img src={logo} alt="" width={150}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" />
            <Nav>
              {
                getSessionCookie() ? 
                <Link to={"/boards"}>
                  <button className="btn btn-outline-light btn-md font-karla">Your Boards</button>
                </Link>
                :
                <div>
                  <Link to={"/login"}>
                    <button className="btn btn-outline-light btn-md font-karla">Login</button>
                  </Link>
                  &nbsp;&nbsp;
                  <Link to={"/register"}>
                    <button className="btn btn-outline-light btn-md font-karla">Sign Up</button>
                  </Link>
                </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
}

export default Index;