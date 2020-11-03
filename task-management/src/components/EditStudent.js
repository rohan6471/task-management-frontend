import React, { Component } from "react"
import axios from "axios"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateProject.css"


class EditStudent extends Component {
  constructor(props) {
    super(props);
    this.firstNameEdit = React.createRef();
    this.lastNameEdit = React.createRef();
    this.contactNumberEdit = React.createRef();
    this.emailEdit = React.createRef();
    this.passwordEdit = React.createRef();
    this.state = {
       
        student:{}
      }
  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/getStudent/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
            student: res.data[0]
        })

      })
    }
  handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("create student")
    const addStudent = {
      firstName: this.firstNameEdit.current.value,
      lastName: this.lastNameEdit.current.value,
      contactNumber: this.contactNumberEdit.current.value,
      email: this.emailEdit.current.value,
      password: this.passwordEdit.current.value
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`http://127.0.0.1:3333/taskmanagement/api/student/updateStudent/${this.props.match.params.id}`, addStudent)
      .then(res => {
        if (res.data.message == "student updated successfully") {
          this.props.history.push("/dashboard/student")
        }

      })
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="2"></Col>
          <Col className="stuForm" md="8">
            <Form className="studentForm" onSubmit={(e) => this.handleSave(e)}>
              <Form.Group controlId="formGroupFirstName">
                <Form.Label>First Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required defaultValue={this.state.student.firstName} type="text" ref={this.firstNameEdit} placeholder="Student's First Name" required />
              </Form.Group>
              <Form.Group controlId="formGroupLastName">
                <Form.Label>Last Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required defaultValue={this.state.student.lastName} ref={this.lastNameEdit} type="text" placeholder="Student's Last Name" />
              </Form.Group>

              <Form.Group controlId="formGroupContact">
                <Form.Label>Contact Number <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required defaultValue={this.state.student.contactNumber} type="text" ref={this.contactNumberEdit} placeholder="Mobile" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required defaultValue={this.state.student.email} type="email" ref={this.emailEdit} placeholder="name@gmail.com" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required
                  type="password" defaultValue={this.state.student.password} ref={this.passwordEdit} placeholder="Password" />
              </Form.Group>

              <Button type="submit" className="createBtn" variant="primary">Save Student</Button>

            </Form>
          </Col>
        </Row>
      </Container>


    )
  }
}
export default EditStudent;
