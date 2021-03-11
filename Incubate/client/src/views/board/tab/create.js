import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import {colors, images, feature} from "../../includes/boardData.js"
import postData, { getSessionCookie } from '../../includes/function'

class Create extends Component {
    
    constructor() {
        super();
        this.state = {
            tabName: "",
            tabDesc: "",
            tabNameError: null,
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

        let url = "http://localhost:5000/api/tab/create";

        let tabName = this.state.tabName.trim();
        let tabDesc = this.state.tabDesc.trim();

        let isValid = true;

        this.setState({
            tabNameError: null,
            disabled: false,
            otherError: [ false, "" ]
        });

        if (tabName.trim() === '') {
            this.setState({ tabNameError: "Enter a tab title." });
            isValid = false;
        }

        if (isValid) {
            await postData(url, { 
                userID: getSessionCookie(),
                tabName: tabName,
                tabDesc: tabDesc,
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
                                                Success! Your new tab was created.
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
                                        <label className="font-karla"> <strong> Tab title: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <input name="tabName" type="text" className="form-control font-karla-small" 
                                            value={this.state.tabName} onChange={this.handleChange} />
                                        <div style={{ color: "red" }}>
                                            <p> { this.state.tabNameError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.tabNameError}</> : "" } &nbsp; </p>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="p-1" />
                                <Row>
                                    <Col lg={12} className="text-left">
                                        <label className="font-karla"> <strong> Description: </strong> </label>
                                    </Col>
                                    <Col lg={12}>
                                        <textarea name="tabDesc" type="text" className="form-control font-karla-small" placeholder="optional"
                                            value={this.state.tabDesc} onChange={this.handleChange} style={{ height: "100px"}}></textarea>
                                        <div style={{ color: "red" }}>
                                            <p> { this.state.tabDescError != null ? <><i className="fas fa-exclamation-circle"/> {this.state.tabDescError}</> : "" } &nbsp; </p>
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
                                        <button type="submit" className="btn btn-outline-dark btn-md font-karla container-fluid" disabled={this.state.disabled}> Create Tab </button>
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
                                }} className="p-4 h-100 center-background" />
                        </Container>
                    </Col>
                </Row>
    }

}

export default Create;