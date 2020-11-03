import React, { Component } from "react"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateStudent.css"
import axios from "axios"

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.projectNameEdit = React.createRef();
    this.projectDescriptionEdit = React.createRef();
    this.projectdueDateEdit = React.createRef();
    this.projectStatusEdit = React.createRef();
    this.assignToEdit = React.createRef();
    this.state = {
      students: [],
      project:{}
    }
  }
  handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    const addProject = {
      name: this.projectNameEdit.current.value,
      description: this.projectDescriptionEdit.current.value,
      duedate: this.projectdueDateEdit.current.value,
      status: this.projectStatusEdit.current.value,
      assignTo : this.assignToEdit.current.value

    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`http://127.0.0.1:3333/taskmanagement/api/project/updateProject/${this.props.match.params.id}`, addProject)
      .then(res => {
        if (res.data.message == "project updated successfully") {
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
      axios.get(`http://127.0.0.1:3333/taskmanagement/api/project/getProject/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          project : res.data[0]
        })

      })


  }
  render() {


    return (
      <Container>
        <Row>
          <Col md="1"></Col>
          <Col md="10" className="divForm">
            <Form className="projectForm" onSubmit={(e) => this.handleSave(e)}>
              <Form.Row>

                <Form.Group as={Col} controlId="formGroupEmail">
                  <Form.Label>Project Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control required  defaultValue={this.state.project.name} type="text" ref={this.projectNameEdit} placeholder="Title of the project" />
                </Form.Group>
                <Form.Group controlId="formGroupdate">
                  <Form.Label>Project Due Date</Form.Label>
                  <Form.Control type="date"  defaultValue="11/11/2020"  ref={this.projectdueDateEdit} name="Due date" placeholder="Due date" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGroupDescription">
                <Form.Label>Project Description <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required  defaultValue={this.state.project.description} ref={this.projectDescriptionEdit} as="textarea" rows="3" />
              </Form.Group>

              <Form.Row>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Project Status</Form.Label>
                  <Form.Control  ref={this.projectStatusEdit} as="select" custom>
                    <option selected={"New assignee" == this.state.project.status ? true : false}>New assignee</option>
                    <option selected={"Inactive" == this.state.project.status ? true : false}>Inactive</option>
                    <option selected={"In Progress" == this.state.project.status ? true : false}>In Progress</option>
                    <option selected={"Completed" == this.state.project.status ? true : false}>Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control  defaultValue={this.state.project.assignTo} ref={this.assignToEdit} as="select" custom>
                    <option key="select student" value="student">Select Student</option>
                    {this.state.students.map(student => {
                      if (student.role != "admin")
                        return (<option key={student.id} value={student.firstName} selected={student.firstName == this.state.project.assignTo ? true : false}>{student.firstName}</option>)
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
              <Button type="submit" className="createBtn" variant="primary">Save Project</Button>

            </Form>
          </Col>
        </Row>
      </Container>

    )
  }
}
export default EditProject;