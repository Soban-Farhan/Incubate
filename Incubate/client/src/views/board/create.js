import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import {colors, images, feature} from "../../includes/boardData.js"
import postData, { getSessionCookie } from '../../includes/function'

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
            disabled: false,
            otherError: [ false, "" ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = async (e) => {

        e.preventDefault();

        let url = "http://localhost:5000/api/board/create";

        let boardName = this.state.boardName.trim();
        let boardDesc = this.state.boardDesc.trim();

        let isValid = true;

        this.setState({
            boardNameError: null,
            disabled: false,
            otherError: [ false, "" ]
        });

        if (boardName.trim() === '') {
            this.setState({ boardNameError: "Enter a board title." });
            isValid = false;
        }

        if (isValid) {
            await postData(url, { 
                userID: getSessionCookie(),
                boardName: boardName,
                boardDesc: boardDesc,
                feature: this.state.feature
            })
            .then((res) => {
                if (res.status === "OK") {
                    this.setState({ disabled: true })
                    setTimeout(() => { window.location = "/boards" }, 2000)
                } else {
                    this.setState({
                        otherError: [
                            true,
                            "The server encountered an internal error or misconfiguration and " 
                            + "was unable to complete your request." ]
                    })
                } 
            })
            .catch(() => {
                this.setState({
                    otherError: [
                        true,
                        "The server encountered an internal error or misconfiguration and " 
                        + "was unable to complete your request." ]
                })
            })
        }
    }

    handleChange = (e) => {
        
        let nam = e.target.name;
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        this.setState({ [nam]: val });

        if (nam === "backgroundColor") {
            let temp = feature;
            temp.background.value = val
            temp.background.type = "color"
            this.setState({
                feature: temp,
                backgroundImage: ""
            })
        } else if (nam === "backgroundImage") {
            let temp = feature;
            temp.background.value = val
            temp.background.type = "image"
            this.setState({
                feature: temp,
                backgroundColor: ""
            })
        }
    }

    render() {
        
        return  <Row className="h-100">
                    <Col lg={6}>
                        <div className="p-4">
                            <p className="font-karla-heavy">
                                Let's get you started!
                            </p>
                            <div className="p-3" />
                                { this.state.disabled ? 
                                    <Row>
                                        <Col lg={12}>
                                            <p className="p-4 font-karla text-center text-light bg-success rounded">
                                                Success! Your new board was created.
                                            </p>
                                        </Col>
                                        <div className="p-3" />
                                    </Row>
                                : <></> }
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
                            <form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Board title: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <input name="boardName" type="text" className="form-control font-karla-small" 
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
                                        <textarea name="boardDesc" type="text" className="form-control font-karla-small" placeholder="optional"
                                            value={this.state.boardDesc} onChange={this.handleChange} style={{ height: "100px"}}></textarea>
                                        <div style={{ color: "red" }}>
                                            <p> { this.state.boardDescError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.boardDescError}</> : "" } &nbsp; </p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Colors: </strong> </label>
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
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Images: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <Row>
                                            { images.map((image) => (
                                                <Col xs={4} sm={4}>
                                                    <div className="p-1" />
                                                    <button name="backgroundImage" type="button" value={image} className="checkbox-design btn btn-sm text-center text-light" 
                                                        style={{ backgroundImage: "url(" + image + ")" }} onClick={this.handleChange} > 
                                                        { this.state.backgroundImage === image ? <i className="fas fa-check"/> : null }
                                                    </button>
                                                </Col>
                                            )) }
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="p-3" />
                                <Row>
                                    <Col className="font-karla">
                                        <button type="submit" className="btn btn-outline-dark btn-md font-karla container-fluid" disabled={this.state.disabled}> Create Board </button>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Container className="p-0 h-100" fluid>
                            <div style={{ 
                                    backgroundImage: "url(" + this.state.backgroundImage + ")",
                                    backgroundColor: this.state.backgroundColor 
                                }} className="p-5 h-100 center-background" />
                        </Container>
                    </Col>
                </Row>
    }

}

export default Create;