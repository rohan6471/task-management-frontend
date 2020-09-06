import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Sidebar from "./sidebar.js";
import '../css/dashboard.css'

class Student extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <Sidebar />
                </Col>
                <Col  xs={10} id="page-content-wrapper">
                    this is a Student
                </Col> 
            </Row>

        </Container>
        );
    }
}
export default Student;