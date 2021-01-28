import React from 'react';
import '../css/master.css';
import banner from '../images/loginBanner.jpg'

// Bootstrap
import { Container, Col, Row, Card } from 'react-bootstrap';

function Login() {
    return (
        <Container className="v-center">
            <Card style={{ boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.15)" }}>
                <img className="card-img-top img-fluid" src={banner} alt="Image Banner" />
                <div className="card-body">
                    <form>
                        <div className="p-2">
                        </div>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={8}>
                                <p className="p-1"></p>
                                <Row>       
                                    <Col lg={2} className="text-left">
                                        <label className="font-karla"> Email </label>
                                    </Col>
                                    <Col lg={10}>
                                        <input className="input-style font-karla" />
                                        <div style={{ color: "red" }}>
                                            <p>Login Error</p>
                                        </div>
                                    </Col>
                                </Row>
                                <p className="p-2"></p>
                                <Row>
                                    <Col lg={2}>
                                        <label className="font-karla"> Password </label>
                                    </Col>
                                    <Col lg={10}>
                                        <input className="input-style font-karla" />
                                        <div style={{ color: "red" }}>
                                        <p>Password Error</p>
                                        </div>
                                        <div style={{ color: "red" }}>
                                            <p>Other Error</p>
                                        </div>
                                    </Col>
                                </Row>
                                <p className="p-1"></p>
                                <Row>
                                    <div className="col-lg-10 offset-lg-2 text-right">
                                        <button type="submit" className="btn btn-outline-dark btn-md"> Login </button>
                                    </div>
                                </Row>
                            </Col>
                            <Col lg={2}/>
                            <p className="p-1"></p>
                        </Row>
                    </form>
                </div>
            </Card>
        </Container>
    );
}

export default Login;