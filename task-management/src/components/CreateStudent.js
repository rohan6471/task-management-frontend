import React, { Component } from "react"
import{Button,Card, Container, Row, Col,Form} from "react-bootstrap";
import {FaCaretRight,FaEye} from "react-icons/fa"
import "../css/CreateProject.css"


class CreateStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
          projects: []
        }
      }
      render() {
        return (
          <Container>
          <Row>
              <Col  md="2"></Col>
              <Col  className="stuForm" md="8">
              <Form className="studentForm">                         
<Form.Group controlId="formGroupFirstName">
<Form.Label>First Name</Form.Label>
<Form.Control type="text" placeholder="Student's First Name" />
</Form.Group>
<Form.Group controlId="formGroupLastName">
<Form.Label>Last Name</Form.Label>
<Form.Control type="text" placeholder="Student's Last Name" />
</Form.Group>

<Form.Group controlId="formGroupContact">
<Form.Label>Contact Number</Form.Label>
<Form.Control type="text" placeholder="Mobile" />
</Form.Group>
<Form.Group controlId="exampleForm.ControlInput1">
<Form.Label>Email address</Form.Label>
<Form.Control type="email" placeholder="name@gmail.com" />
</Form.Group>
<Form.Group controlId="formGroupPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" />
</Form.Group>

<Button className="createBtn"variant="primary">Create Student Worker</Button>

</Form>
              </Col>
          </Row>
      </Container>


        )
      }
    }
    export default CreateStudent;
