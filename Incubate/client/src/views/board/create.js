import React, { Component } from 'react';
import { Container, Col, Row, Tab, Nav, Navbar, Modal } from 'react-bootstrap';

import {colors, feature} from "../../includes/baordData.js"
import postData from '../../includes/function'

class Create extends Component {
    
    constructor() {
        super();
        this.state = {
            boardName: "",
            boardDesc: "",
            boardNameError: null,
            feature: feature,
            backgroundColor: "#0079bf",
            backgroundImage: "",
            otherError: [ false, "" ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let url = "http://localhost:5000/api/board/create";

        let boardName = this.state.boardName;

        let isValid = true;

        this.setState({
            boardNameError: null,
            boardDescError: null,
            otherError: [ false, "" ]
        });

        if (boardName.trim() === '') {
            this.setState({ boardNameError: "Enter a board title." });
            isValid = false;
        }

        console.log(this.state.feature)

        if (isValid) {
        
        }
    }

    handleChange = (e) => {
        
        let nam = e.target.name;
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();
        
        this.setState({ [nam]: val });

        if (nam === "backgroundColor") {
            let test = feature;
            test.background.value = val
            test.background.type = "color"
            this.setState({
                feature: test,
                backgroundImage: ""
            })
        } else if (nam === "backgroundImage") {
            let test = feature;
            test.background.value = val
            test.background.type = "image"
            this.setState({
                feature: test,
                backgroundColor: ""
            })
        }
        
        console.log(this.state.feature)
    }

    render() {
        
        return  <Row className="h-100">
                    <Col sm={{ span: 6, offset: 0}}>
                        <div className="p-4">
                            <p className="font-karla-heavy">
                                Let's get you started!
                            </p>
                            <div className="p-3" />
                            <form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Board title: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <input name="boardName" type="text" className="form-control font-karla" 
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
                                        <textarea name="boardDesc" type="text" className="form-control font-karla" placeholder="optional"
                                            value={this.state.boardDesc} onChange={this.handleChange} style={{ height: "100px"}}></textarea>
                                        <div style={{ color: "red" }}>
                                            <p> { this.state.boardDescError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.boardDescError}</> : "" } &nbsp; </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Background: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            { colors.map((color) => (
                                                <Col xs={4} sm={2}>
                                                    <div className="p-1" />
                                                    <button name="backgroundColor" type="button" value={color} className="checkbox-design btn btn-sm text-center text-light" 
                                                        style={{ backgroundColor: color }} onClick={this.handleChange} > 
                                                        { this.state.backgroundColor === color ? <i className="fas fa-check"/> : null }
                                                    </button>
                                                </Col>
                                            )) }
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="p-3" />
                                <Row>
                                    <Col className="font-karla">
                                        <button type="submit" className="btn btn-outline-dark btn-md font-karla container-fluid"> Create Board </button>
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