import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar, Modal } from 'react-bootstrap';

import '../../css/master.css'
import logo from '../../images/incuabte.png'
import postData, { getSessionCookie } from '../../includes/function'
import Create from "./create.js"

class Board extends Component {
  
  constructor() {
    super();
    this.state = {
      show: false,
      data: []
    }
  }

  async componentDidMount() {
    if (getSessionCookie() === null) {
        window.location = "/boards"
    } else {
      let url = "http://localhost:5000/api/board/get"
      await postData(url, {
        userID: getSessionCookie()
      })
      .then((res) => {
        this.setState({data: res.data})
      })
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
                    <div className="p-3"/>
                    <Row className="h-100">
                      {this.state?.data.map((card) => (
                        <Col sm={4}>
                          <button className="board-cards border-rounded text-light center-background text-left container-fluid"
                              style={{ backgroundColor: card.features.background.value, backgroundImage: "url(" + card.features.background.value + ")" }} >
                            <p className="font-karla-small">
                              <strong>{card.name}</strong>
                            </p>
                          </button>
                          <div className="p-2"/>
                        </Col>
                      ))}
                      <Col sm={4}>
                        <button className="board-cards border-rounded text-center container-fluid"
                            onClick={() => { this.setState({ show: true }); }} >
                              <i className="fas fa-plus" />
                        </button>
                        <div className="p-2"/>
                      </Col>
                    </Row>
                    <Modal size="xl" show={this.state.show}
                      onHide={() => this.setState({ show: false })} centered >
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