import React, { Component } from "react"
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
//import Sidebar from "./Sidebar.js";
import '../css/dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container fluid>
                <Row>



                </Row>

            </Container>
        );
    }

}

export default withRouter(Dashboard);