import React, { Component } from 'react';
import '../css/master.css';
import banner from '../images/loginBanner.jpg'
import sha256 from 'js-sha256';
import postData, { setSessionCookie, getSessionCookie } from '../includes/function'

// Bootstrap
import { Container, Col, Row, Card } from 'react-bootstrap';

class Login extends Component {

    constructor() {
        super();
        this.state = { 
            email: '',
            password: '',
            emailError: null,
            passwordError: null,
            otherError: [ false, "" ],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (getSessionCookie() !== null) {
            window.location = "/Board"
        }
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let url = "http://localhost:5000/api/auth/login";

        let email = this.state.email;
        let password = this.state.password;
        let isValid = true;

        this.setState({
            emailError: null,
            passwordError: null,
            otherError: [ false, "" ]
        })

        if (email.trim() === '') {
            this.setState({ emailError: "Enter your email." });
            isValid = false;
        } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ emailError: "Please enter a valid email. Please try again." });
            isValid = false;
        }

        if (password.trim() === '') {
            this.setState({ passwordError: "Enter your password." });
            isValid = false;
        }

        if (isValid) {
            
            await postData(url, { 
                emailAddress: email,
                password: sha256(password)
            })
            .then((res) => {
                if (res.status === "OK") {
                    setSessionCookie(res.userID)
                } else if (res.status === "NOT FOUND") {
                    this.setState({
                        otherError: [
                            true,
                            "We couldn’t find an account matching the username and password you entered."
                            + " Please check your username and password and try again."
                        ]
                    })
                } else {
                    this.setState({
                        otherError: [
                            true,
                            "The server encountered an internal error or misconfiguration and " 
                            + "was unable to complete your request." ]
                    })
                } 
            })
        }
    };

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value.trim();
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <Container className="v-center">
                <Card style={{ boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.15)", border: "none" }}>
                    <img className="card-img-top img-fluid" src={banner} alt="" />
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="p-4" />
                            <Row>
                                <Col lg={{ span: 8, offset: 2 }}>
                                    { this.state.otherError[0] ? 
                                        <Row>
                                            <Col lg={12}>
                                                <p className="p-4 font-karla text-center text-light bg-danger rounded">
                                                    { this.state.otherError[1] }
                                                </p>
                                            </Col>
                                            <div className="p-3" />
                                        </Row>
                                    : <></> }
                                    <div className="p-1" />
                                    <Row>       
                                        <Col lg={2} className="text-left">
                                            <label className="font-karla"> <strong> Email: </strong> </label>
                                        </Col>
                                        <Col lg={10}>
                                            <input name="email" className="input-style font-karla" 
                                                value={this.state.email} onChange={this.handleChange} />
                                            <div style={{ color: "red" }}>
                                                <p> { this.state.emailError != null ? <><i class="fas fa-exclamation-circle"/> {this.state.emailError}</> : "" } &nbsp; </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className="p-1"></p>
                                    <Row>
                                        <Col lg={2}>
                                            <label className="font-karla"> <strong> Password: </strong> </label>
                                        </Col>
                                        <Col lg={10}>
                                            <input name="password" type="password" className="input-style font-karla" 
                                                value={this.state.password} onChange={this.handleChange} />
                                            <div style={{ color: "red" }}>
                                            <p> { this.state.passwordError != null ? <><i class="fas fa-exclamation-circle"/> {this.state.passwordError}</> : "" } &nbsp; </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={{ span: 10, offset: 2 }} className="font-karla">
                                            <button type="submit" className="btn btn-outline-dark btn-md font-karla"> &nbsp;&nbsp; Login &nbsp;&nbsp; </button>
                                            <span> &nbsp; or &nbsp;<a href="/Identity/Account/Register">Sign Up </a></span>
                                        </Col>
                                    </Row>
                                    <div className="p-3"/>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </Card>
            </Container>
        )
    };
}

export default Login;