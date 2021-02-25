import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Tabs from 'react-bootstrap/Tabs'
import { Container, Col, Row, Tab } from 'react-bootstrap';

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
      <Container className="p-0" fluid>
        <Navbar collapseOnSelect expand="sm" style={{ backgroundColor: "#202020" }} variant="dark">
          <Navbar.Brand><img src={logo} alt="" width={150}/></Navbar.Brand>
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
        <div className="p-4" />
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="h-100">
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                <label className="font-karla-small"> PERSONAL </label>
                  <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="first"> <strong> Boards </strong> </Nav.Link>
                  </Nav.Item>
                  <div className="p-1" />
                  <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="second"> <strong> Tasks </strong> </Nav.Link>
                  </Nav.Item>
                  <div className="p-3" />
                  <label className="font-karla-small"> TEAMS </label>
                  {/* <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="third"> <strong> Teams </strong> </Nav.Link>
                  </Nav.Item> */}
                </Nav>
              </Col>
              <Col sm={1}>
                <div className="vl" />
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    Cupid laid by his brand and fell asleep:
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    A maid of Dian's this advantage found, And his love-kindling
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </Container>
    );
  }
}

export default Board;