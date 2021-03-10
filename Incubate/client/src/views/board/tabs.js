import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom'

import '../../css/master.css'
import logo from '../../images/incuabte.png'
import postData, { getSessionCookie } from '../../includes/function'

class Tabs extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() { 
        const { match: { params } } = this.props;

        console.log(params.boardID)
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
                    <Link to={"/logout"}>
                        <button className="btn btn-outline-light btn-md font-karla">Log Out</button>
                    </Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div className="p-4" />
            </Container>
        )
    }
}

export default Tabs;