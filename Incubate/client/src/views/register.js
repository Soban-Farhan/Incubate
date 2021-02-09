import React, { Component } from 'react';
import '../css/master.css';
import banner from '../images/loginBanner.jpg'
import sha256 from 'js-sha256';
import postData from '../includes/function'

// Bootstrap
import { Container, Col, Row, Card } from 'react-bootstrap';

class Register extends Component {

    constructor() {
        super();
        this.state = { 
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            isEmpty: null,
            hasUpperCase: null,
            hasLowerCase: null,
            hasNumber: null,
            hasCharacter: null,
            otherError: [ false, "" ],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let url = "http://localhost:5000/api/auth/register";

        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        let isValid = true;

        this.setState({
            emailError: null,
            otherError: [ false, "" ]
        })

        if (firstName.trim() === '') {
          this.setState({ firstNameError: "Enter your first name." });
          isValid = false;
        }

        if (lastName.trim() === '') {
          this.setState({ lastNameError: "Enter your last name." });
          isValid = false;
        }

        if (email.trim() === '') {
            this.setState({ emailError: "Enter your email." });
            isValid = false;
        } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({ emailError: "Please enter a valid email. Please try again." });
            isValid = false;
        }

        // if (isValid) {
            
        //     await postData(url, { 
        //         emailAddress: email,
        //         password: sha256(password)
        //     })
        //     .then((res) => {
        //         if (res === "OK") {
        //             console.log(res)
        //         } else if (res === "NOT FOUND") {
        //             this.setState({
        //                 otherError: [
        //                     true,
        //                     "We couldn’t find an account matching the username and password you entered."
        //                     + " Please check your username and password and try again."
        //                 ]
        //             })
        //         } else {
        //             this.setState({
        //                 otherError: [
        //                     true,
        //                     "The server encountered an internal error or misconfiguration and " 
        //                     + "was unable to complete your request." ]
        //             })
        //         } 
        //     })
        //     .catch(
        //         this.setState({
        //             otherError: [
        //                 true,
        //                 "The server encountered an internal error or misconfiguration and " 
        //                 + "was unable to complete your request." ]
        //         })
        //     )

        // }
    };

    handleChange = (event) => {

      this.setState({ isEmpty: null })

      let nam = event.target.name;
      let val = event.target.value.trim();
      this.setState({ [nam]: val });

      if (nam === 'password') {
        if (val === '') {
          this.setState({ isEmpty: true })
        }
      }

    }

    render() {
        return (
            <Container className="v-center">
                <Card style={{ boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.15)", border: "none" }}>
                <Row className="h-100">
                  <Col lg={5} className="p-0 center-image" style={{ backgroundImage: "url(" + banner + ")" }}>
                  </Col>
                  <Col>
                    <div className="card-body">
                      <form onSubmit={this.handleSubmit}>
                        <div className="p-2" />
                        <Row>
                            <Col lg={{ span: 10, offset: 1 }}>
                              <p className="font-karla-heavy">
                                Sign Up
                              </p>
                              <div className="p-3" />
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
                                  <Col>
                                    <Row>
                                      <Col lg={12} className="text-left">
                                          <label className="font-karla"> <strong> First Name: </strong> </label>
                                      </Col>
                                      <Col lg={12}>
                                          <input name="firstName" type="text" className="input-style font-karla" 
                                              value={this.state.firstName} onChange={this.handleChange} />
                                          <div style={{ color: "red" }}>
                                              <p> { this.state.firstNameError != null ? <><i class="fas fa-exclamation-circle"/> {this.state.firstNameError}</> : "" } &nbsp; </p>
                                          </div>
                                      </Col>
                                    </Row>
                                  </Col> 
                                  <Col>
                                    <Row>
                                      <p></p>
                                      <Col lg={12} className="text-left">
                                          <label className="font-karla"> <strong> Last Name: </strong> </label>
                                      </Col>
                                      <Col lg={12}>
                                          <input name="lastName" type="text" className="input-style font-karla" 
                                              value={this.state.lastName} onChange={this.handleChange} />
                                          <div style={{ color: "red" }}>
                                              <p> { this.state.lastNameError != null ? <><i class="fas fa-exclamation-circle"/> {this.state.lastNameError}</> : "" } &nbsp; </p>
                                          </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                                <div className="p-1" />
                                <Row>       
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Email: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <input name="email" className="input-style font-karla" 
                                            value={this.state.email} onChange={this.handleChange} />
                                        <div style={{ color: "red" }}>
                                            <p> { this.state.emailError != null ? <><i class="fas fa-exclamation-circle"/> {this.state.emailError}</> : "" } &nbsp; </p>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="p-1" />
                                <Row>
                                    <Col lg={12}>
                                        <label className="font-karla"> <strong> Password: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <input name="password" type="password" className="input-style font-karla" 
                                            value={this.state.password} onChange={this.handleChange} />

                                        {  }
                                          {
                                            this.state.isEmpty != null ?
                                            <>
                                              <div className="p-2" />
                                              <p className="font-karla-small">
                                                Password should meet the follow requirements:
                                                <div className="p-1"> 
                                                  
                                                  <i class="fas fa-exclamation-circle text-danger"/> Must contain at least one upper case. (ex: A, B, C)<br/>
                                                  <i class="fas fa-exclamation-circle text-danger"/> Must contain at least one lower case. (ex: a, b, c)<br/>
                                                  <i class="fas fa-exclamation-circle text-danger"/> Must contain at least one special character (ex: $, @, %)<br/>
                                                  <i class="fas fa-exclamation-circle text-danger"/> Must contain at least one number. (ex: 1, 2, 3)<br/>
                                                </div>
                                              </p>
                                            </>
                                            : 
                                            <div style={{ color: "red" }}>
                                              <p><i class="fas fa-exclamation-circle text-danger"/> Enter a password.</p>
                                            </div>
                                          }
                                        
                                        <div className="p-2" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="font-karla">
                                        <button type="submit" className="btn btn-outline-dark btn-md font-karla"> &nbsp;&nbsp; Register &nbsp;&nbsp; </button>
                                        <span> &nbsp; or &nbsp;<a href="/Identity/Account/Login">Sign In </a></span>
                                    </Col>
                                </Row>
                                <div className="p-3"/>
                            </Col>
                        </Row>
                      </form>
                    </div>
                  </Col>
                </Row>
                    {/* <img className="card-img-top img-fluid" src={banner} alt="" /> */}
                    
                      
                        {/* <form onSubmit={this.handleSubmit}>
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
                                      <Col>
                                        <Row>
                                          <Col lg={4} className="text-left">
                                              <label className="font-karla"> <strong> First Name: </strong> </label>
                                          </Col>
                                          <Col lg={8}>
                                              <input name="firstName" type="text" className="input-style font-karla" 
                                                  value={this.state.firstName} onChange={this.handleChange} required/>
                                              <div style={{ color: "red" }}>
                                                  <p> { this.state.firstNameError != null ? <>*{this.state.firstNameError}</> : "" } &nbsp; </p>
                                              </div>
                                          </Col>
                                        </Row>
                                      </Col> 
                                      <Col>
                                        <Row>
                                          <Col lg={4} className="text-left">
                                              <label className="font-karla"> <strong> Last Name: </strong> </label>
                                          </Col>
                                          <Col lg={8}>
                                              <input name="lastName" type="text" className="input-style font-karla" 
                                                  value={this.state.lastName} onChange={this.handleChange} required/>
                                              <div style={{ color: "red" }}>
                                                  <p> { this.state.lastNameError != null ? <>*{this.state.lastNameError}</> : "" } &nbsp; </p>
                                              </div>
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                    <div className="p-1" />
                                    <Row>       
                                        <Col lg={2} className="text-left">
                                            <label className="font-karla"> <strong> Email: </strong> </label>
                                        </Col>
                                        <Col lg={10}>
                                            <input name="email" type="email" className="input-style font-karla" 
                                                value={this.state.email} onChange={this.handleChange} required/>
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
                                                value={this.state.password} onChange={this.handleChange} required/>
                                            <div style={{ color: "red" }}>
                                            <p> { this.state.passwordError != null ? <>*{this.state.passwordError}</> : "" } &nbsp; </p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={{ span: 10, offset: 2 }} className="text-right">
                                            <button type="submit" className="btn btn-outline-dark btn-md font-karla"> Sign Up </button>
                                        </Col>
                                    </Row>
                                    <div className="p-3"/>
                                </Col>
                            </Row>
                        </form> */}
                    
                </Card>
            </Container>
        )
    };
}

export default Register;