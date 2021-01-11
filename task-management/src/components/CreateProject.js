import React, { Component } from "react"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCaretRight, FaEye } from "react-icons/fa"
import {Link} from 'react-router-dom'
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
      students: [],
      selectedFile: null,
      FileName: null,
    }
  }
  fileSelectHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
     // FileName: event.target.files[0].name,
    });
  };
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const addProject = {
      name: this.projectName.current.value,
      description: this.projectDescription.current.value,
      duedate: this.projectdueDate.current.value,
      status: this.projectStatus.current.value,
      assignTo : this.assignTo.current.value

    }
    console.log(addProject)
   // axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`project/createProject`, addProject)
      .then(res => {
        if (res.data.message == "project successfully") {
          console.log("changed toast")
         
          const data = new FormData();
          const id = res.data.projectData.id
           data.append("custom-param-name", this.state.selectedFile);
           console.log("fileee")
           console.log(this.state.selectedFile)
           if(this.state.selectedFile != null){
           axios.post(`project/upload/${res.data.projectData.id}`, data).then(res =>{
             if(res.data == "File uploaded"){
              this.props.history.push("/dashboard/project")
             }
             else {
              NotificationManager.error(
                  res.data.message,
                  " ",
                  2000)
                  axios.get(`project/deleteProject/${id}`)
      .then(res => {
      })


             }
            
           })
          }
          else {
           
                this.props.history.push("/dashboard/project")
           
          }
         // 
        }

      })
  }
  componentDidMount() {
    axios.get(`student/getStudents`)
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
                  <Form.Control required  type="text" ref={this.projectName} placeholder="Title of the project" />
                </Form.Group>
                <Form.Group controlId="formGroupdate">
                  <Form.Label>Project Due Date <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control required type="date" ref={this.projectdueDate} name="Due date" placeholder="Due date" />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGroupDescription">
                <Form.Label>Project Description <span style={{ color: "red" }}>*</span></Form.Label>
                <Form.Control required ref={this.projectDescription} as="textarea" rows="3" />
              </Form.Group>

              <Form.Row>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Project Status <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control required ref={this.projectStatus} as="select" custom>
                    <option>New assignee</option>
                    <option>Inactive</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGroupStatus">
                  <Form.Label>Assign To <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control required ref={this.assignTo} as="select" custom>
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
                <Form.Label>Upload Project Files:</Form.Label>
                <input type="file" style={{marginLeft:"20px"}}  onChange={this.fileSelectHandler} /> 
                </Form.Group>
              </Form.Row>
              <Button type="submit" className="createBtn" variant="primary">Create Project</Button>
              
              <Link  to={"/dashboard/Project"} color="primary"><Button type="submit" style={{ marginLeft:"20px"}} className="createBtn" variant="primary">Cancel</Button></Link>

            </Form>
           
          </Col>
         
        </Row>
        <NotificationContainer />
      
      </Container>

    )
  }
}
export default CreateProject;