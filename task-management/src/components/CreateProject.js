import React, { Component } from "react"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateStudent.css"
import axios from "axios"

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.projectName = React.createRef();
    this.projectDescription = React.createRef();
    this.projectdueDate = React.createRef();
    this.projectStatus = React.createRef();
    this.assignTo = React.createRef();
    this.state = {
      students: []
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const addProject = {
      name: this.projectName.current.value,
      description: this.projectDescription.current.value,
      duedate: this.projectdueDate.current.value,
      status: this.projectStatus.current.value,

    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`http://127.0.0.1:3333/taskmanagement/api/project/createProject`, addProject)
      .then(res => {
        if (res.data.message == "project successfully") {
          this.props.history.push("/dashboard/project")
        }

      })
  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/getStudents`)
      .then(res => {
        console.log(res.data)
        this.setState({
          students: res.data
        })

      })

  }
  render() {


    return (
      <Container>
        <Row>
          <Col md="1"></Col>
          <Col md="10" className="divForm">
            <Form className="projectForm" onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Row>

                <Form.Group as={Col} controlId="formGroupEmail">
                  <Form.Label>Project Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control required type="text" ref={this.projectName} placeholder="Title of the project" />
                </Form.Group>
                <Form.Group controlId="formGroupdate">
                  <Form.Label>Project Due Date</Form.Label>
                  <Form.Control type="date" ref={this.projectdueDate} name="Due date" placeholder="Due date" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGroupDescription">
                <Form.Label>Project Description <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required ref={this.projectDescription} as="textarea" rows="3" />
              </Form.Group>

              <Form.Row>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Project Status</Form.Label>
                  <Form.Control ref={this.projectStatus} as="select" custom>
                    <option>New assignee</option>
                    <option>Inactive</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control ref={this.assignTo} as="select" custom>
                    <option key="select student" value="student">Select Student</option>
                    {this.state.students.map(student => {
                      if (student.role != "admin")
                        return (<option key={student.id} value={student.firstName}>{student.firstName}</option>)
                    }
                    )}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Row>

                <Form.Group controlId="formGroupFile">
                  <Form.Label>Upload Project Files</Form.Label>
                  <Form.File as={Col}
                    id="custom-file"
                    label="Custom file input"
                    custom
                  />
                </Form.Group>
              </Form.Row>
              <Button type="submit" className="createBtn" variant="primary">Create Project</Button>

            </Form>
          </Col>
        </Row>
      </Container>

    )
  }
}
export default CreateProject;