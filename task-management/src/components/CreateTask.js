import React, { Component } from "react"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateTask.css"
import axios from "axios"
class CreateTask extends Component {
    constructor(props) {
      super(props);
    }
    render() {


        return (
            <Container>
                <Row>
                    <Col md="1"></Col>
                    <Col md="10" className="divForm1">
    <Form className="taskForm">
  
    <Form.Group controlId="Taskname">
      <Form.Label>Task Name</Form.Label>
      <Form.Control type="text" placeholder="New Task.." />
    </Form.Group>

  <Form.Group controlId="TaskDescription">
     <Form.Label>Project Description <span style={{ color: "red" }}>*</span></Form.Label>
    <Form.Control required ref={this.projectDescription} as="textarea" rows="3" />
</Form.Group>
<Form.Row>

                <Form.Group as={Col} controlId="TaskStatus">
                  <Form.Label>Task Status</Form.Label>
                  <Form.Control  as="select" custom>
                    <option>New assignee</option>
                    <option>Inactive</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="TaskAssign">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control as="select" custom>
                  <option>Rohan</option>
                    {/* <option key="select student" value="student">Select Student</option>
                    {this.state.students.map(student => {
                      if (student.role != "admin")
                        return (<option key={student.id} value={student.firstName}>{student.firstName}</option>)
                    }
                    )} */}
                   
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Col} controlId="TaskStartdate">
                  <Form.Label>Project Due Date</Form.Label>
                  <Form.Control type="date" name="Due date" placeholder="Start date" />
                </Form.Group>
                <Form.Group  as={Col} controlId="TaskEnddate">
                  <Form.Label>Project Due Date</Form.Label>
                  <Form.Control type="date" name="Due date" placeholder="End date" />
                </Form.Group>
              </Form.Row>
              <Form.Row>

                <Form.Group controlId="TaskFile">
                  <Form.Label>Upload Project Files</Form.Label>
                  <Form.File as={Col}
                    id="custom-file"
                    label="Custom file input"
                    custom
                  />
                </Form.Group>
              </Form.Row>
              <Button type="submit" className="createTaskBtn" variant="primary">Create Task</Button>



              </Form>
  </Col>
                </Row>
            </Container>
          
        )
    }
}
export default CreateTask;