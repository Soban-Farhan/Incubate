import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar, Modal } from 'react-bootstrap';

class Create extends Component {
    
    constructor() {
        super();
        this.state = {
            boardName: "",
            boardDesc: "",
            boardNameError: null,
            boardDescError: null,
            background: "",
            otherError: [ false, "" ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let url = "http://localhost:5000/api/board/create";

        let boardName = this.state.boardName;
        let boardDesc = this.state.boardDesc;

        let isValid = true;

        this.setState({
            boardNameError: null,
            boardDescError: null,
            otherError: [ false, "" ]
        });



    }

    handleChange = (e) => {
        
        let nam = e.target.name;
        let val = e.target.value.trim();
        
        this.setState({ [nam]: val });

    }


    render() {
        return  <Row className="h-100">
                    <Col sm={5}>
                        <div className="p-4">
                            <p className="font-karla-heavy">
                                Let's get you started!
                            </p>
                            <div className="p-3" />
                            <form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col lg={12} className="text-left">
                                                <label className="font-karla"> <strong> Board title: </strong> </label>
                                            </Col>
                                            <Col lg={12}>
                                                <input name="boardName" type="text" className="form-control font-karla border-dark" 
                                                    value={this.state.boardName} onChange={this.handleChange} />
                                                <div style={{ color: "red" }}>
                                                    <p> { this.state.boardNameError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.boardNameError}</> : "" } &nbsp; </p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="p-1" />
                                        <Row>
                                            <Col lg={12} className="text-left">
                                                <label className="font-karla"> <strong> Description: </strong> </label>
                                            </Col>
                                            <Col lg={12}>
                                                <textarea name="boardDesc" type="text" className="form-control font-karla border-dark" 
                                                    value={this.state.boardDesc} onChange={this.handleChange}></textarea>
                                                <div style={{ color: "red" }}>
                                                    <p> { this.state.boardDescError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.boardDescError}</> : "" } &nbsp; </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col sm={7}>
                    </Col>
                </Row>
    }

}

export default Create;