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
            tabs: [],
            board: [],
        }
    }

    async componentDidMount() {
        
        if (getSessionCookie() === null) {
            window.location = "/login"
        } else {

            const { match: { params } } = this.props;

            let url = "http://localhost:5000/api/board/get"
            await postData(url, {
                userID: getSessionCookie(),
                boardID: params.boardID
            })
            .then((res) => {
                this.setState({board: res.data})
                // if (this.state.board.features.background.type === "image") {
                //     document.body.style.backgroundImage = "url(" + this.state.board.features.background.value + ")";
                // } else {
                //     document.body.style.backgroundColor = this.state.board.features.background.value;
                // }
            })
        }
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "";
    }

    render() {
        
        return (
                <Container className="p-0" fluid>
                    {/* <Navbar collapseOnSelect expand="sm" className="bg-dark" variant="dark">
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
                    </Navbar> */}
                    <div className="p-2" />
                    <Container fluid>
                        <div className="p-4" />
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }}>
                                <Row className="h-100 tab-col">
                                    <Col xl={2}>
                                        <div className="p-2" />
                                        <Row>
                                            <Col xs={6} xl={12}>
                                                <Link to={""}>
                                                    <div className="p-2" />
                                                    <button className="btn btn-md container-fluid font-karla-small text-left"><i className="fas fa-columns"/> &nbsp; Dashboard</button>
                                                    <div className="p-2" />
                                                </Link>
                                            </Col>
                                            <Col xs={6} xl={12}>
                                                <Link to={""}>
                                                    <div className="p-2" />
                                                    <button className="btn btn-md container-fluid font-karla-small text-left"><i className="fas fa-folder"/> &nbsp; Group Files</button>
                                                    <div className="p-2" />
                                                </Link>
                                            </Col>
                                            <Col xs={6} xl={12}>
                                                <Link to={""}>
                                                    <div className="p-2" />
                                                    <button className="btn btn-md container-fluid font-karla-small text-left"><i className="fas fa-tasks"/> &nbsp; My Task</button>
                                                    <div className="p-2" />
                                                </Link>
                                            </Col>
                                        </Row>
                                        <div className="p-2" />
                                        
                                        {/* <Link to={""}>
                                            <div className="p-2" />
                                            <button className="btn btn-md container-fluid font-karla-small text-left"><i className="fas fa-folder"/> &nbsp; Group Files</button>
                                            <div className="p-2" />
                                        </Link>
                                        <Link to={""}>
                                            <div className="p-2" />
                                            <button className="btn btn-md container-fluid font-karla-small text-left"><i className="fas fa-tasks"/> &nbsp; My Task</button>
                                            <div className="p-2" />
                                        </Link>
                                        <div className="p-2" /> */}
                                    </Col>
                                    
                                    {/* {   this.state?.tabs.map((tab) => (
                                            <Col xs={3} lg={1} className="p-1">
                                                <div className="p-1" />
                                                <button className="tab-cards border-rounded text-center container-fluid" />
                                                <div className="p-1" />
                                            </Col>
                                        ))
                                    }
                                    {   this.state?.tabs.length !== 4 ?
                                            <Col xs={3} lg={1} className="p-1">
                                                <div className="p-1" />
                                                <button className="tab-cards border-rounded text-center container-fluid">
                                                    <i className="fas fa-plus" />
                                                </button>
                                                <div className="p-1" />
                                            </Col> 
                                        : ""
                                    }
                                    */}
                                </Row>
                            </Col>
                            <Col lg={{ span: 10, offset: 1 }}>
                                <div className="p-2">
                                    <Row className="h-100">

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
        )
    }
}

export default Tabs;