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

    // componentWillUnmount() {
    //     document.body.style.backgroundImage = "";
    //     document.body.style.backgroundColor = "";
    // }

    render() {
        if (this.state.board.features.background.type === "image") {
            const background = { backgroundImage: "url(" + "" + ")" }
        } else {
            const background = { backgroundColor: this.state.board.features.background.value + ")" }
        }
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
                    </Navbar> 
                    <div className="p-2" /> */}
                    <Container fluid className="v-center">
                        <div className="p-4" />
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }} className="border-rounded-all bg-light">
                                <Row className="h-100">
                                    <Col xl={12} style={ { backgroundImage: "url(" + '${this.state.board.features.background.value}%' + ")" } }>
                                        <p className="p-4 m-0 text-center font-karla-normal text-light">
                                            { this.state.board?.name}
                                        </p>
                                    </Col>
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                        <Col xl={2} className="bg-light">
                                            {/* <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <div className="p-2" />
                                                    <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="first"><i className="fas fa-clipboard-list"/> &nbsp;&nbsp; <strong> Dashboard </strong> </Nav.Link>
                                                    <div className="p-2" />
                                                </Nav.Item>
                                                <div className="p-1" />
                                                <Nav.Item>
                                                    <div className="p-2" />
                                                    <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="second"><i className="fas fa-folder"/> &nbsp;&nbsp; <strong> Group Files </strong> </Nav.Link>
                                                    <div className="p-2" />
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <div className="p-2" />
                                                    <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="third"><i className="fas fa-tasks"/> &nbsp;&nbsp; <strong> My Task </strong> </Nav.Link>
                                                    <div className="p-2" />
                                                </Nav.Item>
                                            </Nav> */}
                                            <Nav variant="pills">
                                                <Row>
                                                    <Col xs={4} md={12}>
                                                        <div className="p-2" />
                                                        <Nav.Item>
                                                            <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="first"><i className="fas fa-clipboard-list"/>&nbsp;&nbsp; <strong> Dashboard </strong> </Nav.Link>
                                                        </Nav.Item>
                                                        <div className="p-2" />
                                                    </Col>
                                                    <Col xs={4} md={12}>
                                                        <div className="p-2" />
                                                        <Nav.Item>
                                                            <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="second"><i className="fas fa-folder"/>&nbsp;&nbsp; <strong> Group Files </strong> </Nav.Link>
                                                        </Nav.Item>
                                                        <div className="p-2" />
                                                    </Col>
                                                    <Col xs={4} md={12}>
                                                        <div className="p-2" />
                                                        <Nav.Item>
                                                            <Nav.Link className="btn btn-md font-karla-extra-small text-left" eventKey="third"><i className="fas fa-tasks"/>&nbsp;&nbsp; <strong> My Task </strong> </Nav.Link>
                                                        </Nav.Item>
                                                        <div className="p-2" />
                                                    </Col>
                                                    <Col md={12} className="text-center">
                                                        <Link to={""}>
                                                            <div className="p-2" />
                                                            <button className="btn btn-md btn-outline-danger font-karla-small text-left"><i className="fas fa-sign-out-alt"/> &nbsp;&nbsp; Log Out</button>
                                                            <div className="p-2" />
                                                        </Link>
                                                        <div className="p-3" />
                                                    </Col>
                                                </Row>
                                            </Nav>
                                        </Col>
                                        <Col xl={10} className="border-less-rounded-top-left">
                                            <div className="p-5"/>
                                            {/* <Tab.Content>
                                                <Tab.Pane eventKey="first">
                                                    adasd
                                                </Tab.Pane>
                                            </Tab.Content> */}
                                        </Col>
                                        {/* <Col xl={12} className="bg-light">
                                            <div className="p-3" />
                                        </Col> */}
                                    </Tab.Container>
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