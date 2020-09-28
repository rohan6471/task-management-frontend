import React, { Component } from "react"
import{Button,Card, Container, Row, Col,Form} from "react-bootstrap";
import {FaCaretRight,FaEye} from "react-icons/fa"
import "../css/CreateStudent.css"

class CreateProject extends Component {
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
            <Col md="1"></Col>
            <Col md="10" className="divForm">
    <Form className="projectForm">
    <Form.Row>
   
     <Form.Group as={Col} controlId="formGroupEmail">
    <Form.Label>Project Name</Form.Label>
    <Form.Control type="text" placeholder="Title of the project" />
  </Form.Group>
  <Form.Group controlId="formGroupdate">
    <Form.Label>Project Due Date</Form.Label>
    <Form.Control type="date" name="Due date" placeholder="Due date" />
  </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGroupDescription">
    <Form.Label>Project Description</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>

<Form.Row>
  
  <Form.Group  as={Col} controlId="formGroupStatus">
    <Form.Label>Project Status</Form.Label>
    <Form.Control as="select" custom>
      <option>New assignee</option>
      <option>Inactive</option>
      <option>In Progress</option>
      <option>Completed</option>
       </Form.Control>
  </Form.Group>

  <Form.Group as={Col} controlId="formGroupStatus">
    <Form.Label>Assign To</Form.Label>
    <Form.Control as="select" custom>
      <option>New assignee</option>
      <option>Inactive</option>
      <option>In Progress</option>
      <option>Completed</option>
       </Form.Control>
  </Form.Group>
  </Form.Row>
  <Form.Row>
  
  <Form.Group  controlId="formGroupFile">
    <Form.Label>Upload Project Files</Form.Label>
  <Form.File as={Col}
    id="custom-file"
    label="Custom file input"
    custom
  /> 
    </Form.Group>
    </Form.Row>
    <Button className="createBtn"variant="primary">Create Project</Button>

</Form>
</Col>
</Row>
</Container>
         
        )
      }
}
export default CreateProject;