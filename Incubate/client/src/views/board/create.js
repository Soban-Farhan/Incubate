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
            background: "#0079bf",
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
        let val = e.target.type === 'checkbox' ? e.target.checked : e.target.value.trim();
        
        this.setState({ [nam]: val });

    }

    // handleButtonClick = (e) => {

    //     let val = e.target.value;
        
    //     this.setState({ background: val });
    // }


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
                                        <textarea name="boardDesc" type="text" className="form-control font-karla" 
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
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#0079bf" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#0079bf" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#0079bf" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#d29034" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#d29034" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#d29034" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#519839" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#519839" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#519839" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#b04632" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#b04632" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#b04632" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#89609e" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#89609e" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#89609e" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            <Col xs={4} sm={2}>
                                                <div className="p-1" />
                                                <button name="background" value="#cd5a91" className="checkbox-design btn btn-sm text-center text-light" 
                                                    style={{ backgroundColor: "#cd5a91" }} onClick={this.handleChange} > 
                                                    { this.state.background === "#cd5a91" ? <i className="fas fa-check"/> : null }
                                                </button>
                                            </Col>
                                            {/* <Col xs={3}>
                                            <div className="p-1" />
                                                <button value="#d29034" className="checkbox-design btn btn-sm border-dark" style={{ backgroundColor: "#d29034" }}/>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="p-1" />
                                                <button value="#000" className="checkbox-design btn btn-sm border-dark" style={{ backgroundColor: "#000" }}/>
                                            </Col>
                                            <Col xs={3}>
                                                <div className="p-1" />
                                                <button value="#000" className="checkbox-design btn btn-sm text-center text-light" style={{ backgroundColor: "#000" }}> 
                                                    
                                                </button>
                                            </Col> */}
                                        </Row>
                                    </Col>
                                </Row>
                            </form>
                        </div>
                    </Col>
                    {/* <Col sm={7}>
                    </Col> */}
                </Row>
    }

}

export default Create;