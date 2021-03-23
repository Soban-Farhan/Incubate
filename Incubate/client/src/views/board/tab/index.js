import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom'

import '../../../css/master.css'
import logo from '../../../images/incuabte.png'
import postData, { getSessionCookie } from '../../../includes/function'

class Tabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [[],[],[]]
        }
    }

    componentDidMount() { 
        const { match: { params } } = this.props;
    }

    render() {
        
        return (
                <Container className="p-0" fluid>
                    <Navbar collapseOnSelect expand="sm" className="bg-dark" variant="dark">
                        <Navbar.Brand><img src={logo} alt="" width={150}/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto" />
                            <Nav className="text-right">
                            <div className="p-2" />
                                <Link to={"/logout"}>
                                    <button className="btn btn-outline-light btn-md font-karla">Log Out</button>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="p-2" />
                    <Container fluid>
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }}>
                                <div className="tab-col p-2">
                                    <Row className="h-100">
                                        { this.state?.tabs.map((tab) => (
                                                <Col xs={3} lg={1} className="p-1">
                                                    <button className="tab-cards border-rounded text-center container-fluid" />
                                                    <div className="p-1" />
                                                </Col>
                                            ))
                                        }
                                        { this.state?.tabs.length !== 4 ?
                                            <Col xs={3} lg={1} className="p-1">
                                                <button className="tab-cards border-rounded text-center container-fluid">
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </Col> : ""
                                        }
                                        
                                    </Row>
                                </div> 
                            </Col>
                            <Col lg={{ span: 10, offset: 1 }}>
                                <div className="p-2" />
                                <Container fluid className="bg-light rounded p-3">
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            
        )
    }
}

export default Tabs;