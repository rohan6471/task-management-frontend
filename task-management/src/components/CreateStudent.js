import React, { Component } from "react"
import axios from "axios"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateProject.css"


class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.contactNumber = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("create student")
    const addStudent = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      contactNumber: this.contactNumber.current.value,
      email: this.email.current.value,
      password: this.password.current.value
    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`http://127.0.0.1:3333/taskmanagement/api/student/addStudent`, addStudent)
      .then(res => {
        if (res.data.message == "student created successfully") {
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
            <Form className="studentForm" onSubmit={(e) => this.handleSubmit(e)}>
              <Form.Group controlId="formGroupFirstName">
                <Form.Label>First Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required type="text" ref={this.firstName} placeholder="Student's First Name" required />
              </Form.Group>
              <Form.Group controlId="formGroupLastName">
                <Form.Label>Last Name <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required ref={this.lastName} type="text" placeholder="Student's Last Name" />
              </Form.Group>

              <Form.Group controlId="formGroupContact">
                <Form.Label>Contact Number <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required type="text" ref={this.contactNumber} placeholder="Mobile" />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required type="email" ref={this.email} placeholder="name@gmail.com" />
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required
                  type="password" ref={this.password} placeholder="Password" />
              </Form.Group>

              <Button type="submit" className="createBtn" variant="primary">Create Student Worker</Button>

            </Form>
          </Col>
        </Row>
      </Container>


    )
  }
}
export default CreateStudent;
