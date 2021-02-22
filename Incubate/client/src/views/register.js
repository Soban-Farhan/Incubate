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
            hasUpperCase: false,
            hasLowerCase: false,
            hasNumber: false,
            hasCharacter: false,
            hasValidLength: false,
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
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            isEmpty: false,
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

        if ( this.state.isEmpty || this.state.isEmpty === null) {
          this.setState({ isEmpty: true })
          isValid = false;
        } else if (!(this.state.hasUpperCase && this.state.hasLowerCase 
                  && this.state.hasNumber && this.state.hasCharacter && this.state.hasValidLength)) {
          isValid = false;
        }

        if (isValid) {
            
          await postData(url, { 
              firstName: firstName,
              lastName: lastName,
              emailAddress: email,
              password: sha256(password)
          })
          .then((res) => {
              if (res.status === "OK") {
                  window.location = "/login"
              } else if (res.status === "FOUND") {
                  this.setState({
                      otherError: [
                          true,
                          "That email address is already in use, please use a different email address."
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
          .catch(err => {
              this.setState({
                  otherError: [
                      true,
                      "The server encountered an internal error or misconfiguration and " 
                      + "was unable to complete your request." ]
              })
          })
        }
    };

    handleChange = (event) => {

      let nam = event.target.name;
      let val = event.target.value.trim();
      this.setState({ [nam]: val });

      if (nam === 'password') {
        this.setState({ isEmpty: null })
        
        if (val === '') {
          this.setState({ isEmpty: true })
        } else {
          this.setState({ isEmpty: false })

          if (val.length > 7 && val.length < 30) {
            this.setState({ hasValidLength: true })
          } else {
            this.setState({ hasValidLength: false })
          }

          if (/\d/.test(val)) {
            this.setState({ hasNumber: true })
          } else {
            this.setState({ hasNumber: false })
          }

          if (/[a-z]/.test(val)) {
            this.setState({ hasLowerCase: true })
          } else {
            this.setState({ hasLowerCase: false })
          }
          
          if (/[A-Z]/.test(val)) {
            this.setState({ hasUpperCase: true })
          } else {
            this.setState({ hasUpperCase: false })
          }
          if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val)) {
            this.setState({ hasCharacter: true })
          } else {
            this.setState({ hasCharacter: false })
          }
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
                              <p className="font-karla">
                                lets get you started!
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
                                              <p> { this.state.firstNameError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.firstNameError}</> : "" } &nbsp; </p>
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
                                              <p> { this.state.lastNameError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.lastNameError}</> : "" } &nbsp; </p>
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
                                            <p> { this.state.emailError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.emailError}</> : "" } &nbsp; </p>
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

                                          {
                                            this.state.isEmpty === null ?
                                              <>&nbsp;</>
                                            :

                                            this.state.isEmpty === true ?

                                              <div style={{ color: "red" }}>
                                                <p><i className="fas fa-exclamation-circle text-danger"/> Enter a password.</p>
                                              </div>
                                            : 
                                            
                                              <>
                                                <div className="p-2" />
                                                <div className="font-karla-small">
                                                  Password should meet the follow requirements:
                                                  <div className="p-1"> 
                                                    { this.state.hasValidLength ? <><i className="fas fa-check text-success"/>&nbsp;</> : 
                                                    <><i className="fas fa-exclamation-circle text-danger"/>&nbsp;</> }
                                                    Must be between 7 and 30 length.<br/>
                                                    { this.state.hasUpperCase ? <><i className="fas fa-check text-success"/>&nbsp;</> : <><i className="fas fa-exclamation-circle text-danger"/>&nbsp;</> } 
                                                    Must contain at least one upper case. (ex: A, B, C)<br/>
                                                    { this.state.hasLowerCase ? <><i className="fas fa-check text-success"/>&nbsp;</> : <><i className="fas fa-exclamation-circle text-danger"/>&nbsp;</> } 
                                                    Must contain at least one lower case. (ex: a, b, c)<br/>
                                                    { this.state.hasCharacter ? <><i className="fas fa-check text-success"/>&nbsp;</> : <><i className="fas fa-exclamation-circle text-danger"/>&nbsp;</> } 
                                                    Must contain at least one special character (ex: $, @, %)<br/>
                                                    { this.state.hasNumber ? <><i className="fas fa-check text-success"/>&nbsp;</> : <><i className="fas fa-exclamation-circle text-danger"/>&nbsp;</> } 
                                                    Must contain at least one number. (ex: 1, 2, 3)<br/>
                                                  </div>
                                                </div>
                                              </>
                                          }
                                        
                                        <div className="p-2" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="font-karla">
                                        <button type="submit" className="btn btn-outline-dark btn-md font-karla container-fluid"> Register </button>
                                        <div className="p-2" />
                                        <p className="font-karla-small">
                                            <a href="/login"> Already have an account? </a>
                                        </p>
                                    </Col>
                                </Row>
                                <div className="p-3"/>
                            </Col>
                        </Row>
                      </form>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Container>
        )
    };
}

export default Register;