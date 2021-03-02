import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar, Modal } from 'react-bootstrap';

import '../../css/master.css'
import logo from '../../images/incuabte.png'
import { getSessionCookie } from '../../includes/function'
import Create from "./create.js"

class Board extends Component {
  
  constructor() {
    super();
    this.state = {
      show: true
    }
  }

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
                <label className="font-karla-small"><i className="fas fa-user" /> &nbsp; PERSONAL </label>
                  <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="first"><i className="fas fa-clipboard-list"/> &nbsp; <strong> Boards </strong> </Nav.Link>
                  </Nav.Item>
                  <div className="p-1" />
                  <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="second"><i className="fas fa-tasks"/> &nbsp; <strong> Tasks </strong> </Nav.Link>
                  </Nav.Item>
                  <div className="p-3" />
                  <label className="font-karla-small"><i className="fas fa-users" /> &nbsp; TEAM </label>
                  <Nav.Item>
                    <Nav.Link className="font-karla-small" eventKey="third"><i className="fas fa-plus" /> &nbsp; <strong> Create a team </strong> </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={1}>
                <div className="vl" />
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Row className="h-100">
                      <Col sm={4}>
                        <p className="h-100 bg-light border-rounded">tester tester tester tester tester tester tester tester tester tester tester tester tester tester</p>
                      </Col>
                      <Col sm={4}>
                        <div className="h-100 bg-light border-rounded">
                          <div className="v-relative-center text-center">
                            <button class="btn btn-md font-karla-small" style={{ borderRadius: "25px", width: "40px", height: "40px", backgroundColor: "#202020"}}
                              onClick={() => { this.setState({ show: true }); }} >
                              <i class="fas fa-plus text-light"></i>
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Modal
                      size="xl"
                      show={this.state.show}
                      onHide={() => this.setState({ show: false })}
                      aria-labelledby="example-custom-modal-styling-title"
                      centered >
                      <Modal.Body className="p-0">
                        <Create/>
                      </Modal.Body>
                  </Modal>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    
                    
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