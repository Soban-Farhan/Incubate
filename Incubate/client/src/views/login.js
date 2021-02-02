import React, { Component }from 'react';
import '../css/master.css';
import banner from '../images/loginBanner.jpg'

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
            otherError: null,
            isValid: null,
            isLoading: true,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {

        let email = this.state.email;
        let password = this.state.password;

        this.setState({
            emailError: null,
            passwordError: null,
            isValid: true
        })

        if (email.trim() === '') {
            this.setState({ 
                emailError: "Email is a required field. Enter your email.",
                isValid: false 
            });
        } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ 
                emailError: "Please enter a valid email. Please try again.",
                isValid: false 
            });
        }

        if (password.trim() === '') {
            this.setState({ 
                passwordError: "Password is a required field. Enter your password.",
                isValid: false 
            });
        }

        if (this.state.isValid) {
            this.setState({
                otherError: "Form is valid"
            })
        }

        return event.preventDefault();
    };

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val.trim() });
    }

    render() {
        return (
            <Container className="v-center">
                <Card style={{ boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.15)", border: "none" }}>
                    <img className="card-img-top img-fluid" src={banner} alt="" />
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="p-3" />
                            <Row>
                                {/* <Col lg={2}/> */}
                                <Col lg={{ span: 8, offset: 2 }}>
                                    <p className="p-1"></p>
                                    <Row>       
                                        <Col lg={2} className="text-left">
                                            <label className="font-karla"> <strong> Email: </strong> </label>
                                        </Col>
                                        <Col lg={10}>
                                            <input name="email" className="input-style font-karla" 
                                                value={this.state.email} onChange={this.handleChange} />
                                            <div style={{ color: "red" }}>
                                                <p> { this.state.emailError != null ? <>*{this.state.emailError}</> : "" } &nbsp; </p>
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
                                            <p> { this.state.passwordError != null ? <>*{this.state.passwordError}</> : "" } &nbsp; </p>
                                            </div>
                                            <div style={{ color: "red" }}>
                                                <p> { this.state.otherError != null ? <>*{this.state.otherError}</> : "" } </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className="p-1"></p>
                                    <Row>
                                        <div className="col-lg-10 offset-lg-2 text-right">
                                            <button type="submit" className="btn btn-outline-dark btn-md"> Login </button>
                                        </div>
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