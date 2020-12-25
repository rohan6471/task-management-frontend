import React, { Component } from "react"
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaCaretRight, FaEye } from "react-icons/fa"
import "../css/CreateStudent.css"
import axios from "axios"

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.taskName = React.createRef();
    this.taskDescription = React.createRef();
    this.taskStatus = React.createRef();
   this.assignTo = React.createRef();
   this.startDate = React.createRef();
   this.expectedEndDate = React.createRef();
   this.projectId = React.createRef();
    this.state = {
      projects: [],
      students: [],
      project : {},
      task:{},
      startDate : '',
      endDate : ''
      
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const addProject = {
      taskName: this.taskName.current.value,
      description: this.taskDescription.current.value,
      status: this.taskStatus.current.value,
      assignedTo: this.assignTo.current.value,
      startDate : this.startDate.current.value,
      expectedEndDate : this.expectedEndDate.current.value,
      projectId : this.projectId.current.value

    }
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(`http://127.0.0.1:3333/taskmanagement/api/task/updateTask/${this.props.match.params.id}`, addProject)
      .then(res => {
        if (res.data.message == "Task updated successfully") {
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
    axios.get(`http://127.0.0.1:3333/taskmanagement/api/project/getProjects`)
      .then(res => {
        console.log(res.data)
        this.setState({
          projects: res.data
        })

      })
      axios.get(`http://127.0.0.1:3333/taskmanagement/api/task/getTask/${this.props.match.params.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          project : res.data[0],
          startDate :res.data[0].startDate.split("T")[0],
          endDate :res.data[0].expectedEndDate.split("T")[0]
         
        })
        console.log(this.state.project)

      })

  }
  render() {


    return (
        <Container>
            <Row>
                <Col md="1"></Col>
                <Col md="10" className="divForm1">
<Form className="taskForm" onSubmit={(e) => this.handleSubmit(e)}>

<Form.Group controlId="Taskname">
  <Form.Label>Task Name<span style={{ color: "red" }}>*</span></Form.Label>
  <Form.Control required type="text" defaultValue={this.state.project.taskName} ref={this.taskName}  placeholder="New Task.." />
</Form.Group>

<Form.Group controlId="TaskDescription">
 <Form.Label>Task Description <span style={{ color: "red" }}>*</span></Form.Label>
<Form.Control required defaultValue={this.state.project.description} ref={this.taskDescription} as="textarea" rows="3" />
</Form.Group>
<Form.Row>

            <Form.Group as={Col} controlId="TaskStatus">
              <Form.Label>Task Status<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control required defaultValue={this.state.project.status} ref={this.taskStatus} as="select" custom>
              <option selected={"New assignee" == this.state.project.status ? true : false}>New assignee</option>
                    <option selected={"Inactive" == this.state.project.status ? true : false}>Inactive</option>
                    <option selected={"In Progress" == this.state.project.status ? true : false}>In Progress</option>
                    <option selected={"Completed" == this.state.project.status ? true : false}>Completed</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="TaskAssign">
              <Form.Label>Assign To<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control required defaultValue={this.state.project.assignedTo} ref={this.assignTo} as="select" custom>
              <option key="select student" value="student">Select Student</option>
                {this.state.students.map(student => {
                  if (student.role != "admin")
                    return (<option key={student.firstName} value={student.firstName} selected={student.firstName == this.state.project.assignedTo ? true : false}>{student.firstName}</option>)
                }
                )}
               
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
          <Form.Group as={Col} controlId="TaskStartdate">
              <Form.Label>Strat Date<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control required defaultValue={this.state.startDate} ref={this.startDate} type="date" name="Due date" placeholder="Start date" />
            </Form.Group>
            <Form.Group  as={Col} controlId="TaskEnddate">
              <Form.Label>Expected End Date<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control required defaultValue={this.state.endDate} ref={this.expectedEndDate} type="date" name="Due date" placeholder="End date" />
            </Form.Group>
          </Form.Row>
          <Form.Row>

            <Form.Group as={Col} controlId="ProjectName">
              <Form.Label>Project Name: <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control required defaultValue={this.state.project.projectId} ref={this.projectId} as="select" custom>
              <option key="select project" value="project">Select Project</option>
                {this.state.projects.map(student => {
                 
                    return (<option key={student.id} value={student.id} selected={student.id == this.state.project.projectId ? true : false}>{student.name}</option>)
                }
                )}
              </Form.Control>
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
          <Button type="submit" className="createTaskBtn" variant="primary">Update Task</Button>



          </Form>
</Col>
            </Row>
        </Container>
      
    )
  }
}
export default EditTask;