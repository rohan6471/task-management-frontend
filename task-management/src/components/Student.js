import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button , Table} from "react-bootstrap";
import { withRouter } from "react-router";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt, FaTrashAlt,FaUsers,Fabox} from "react-icons/fa"
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../css/Student.css'

class Student extends Component {
    constructor(props){
        super(props);
        this.state = {
          students: []
        }
      }
      componentDidMount() {
        axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/getStudents`)
          .then(res => {
            const students = res.data;
            this.setState({ students });
          })
      }
      handleChange(event) {
        console.log("entered searh product")
        console.log(event.target.value)
        //this.setState({value: event.target.value});
        if(event.target.value==''){
          axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/getStudents`)
          .then(res => {
            const students = res.data;
            this.setState({ students });
          })
        }
        else {
        axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/search/${event.target.value}`)
        .then(res => {
          this.setState({
            students:[...res.data]
          })
       
        })
      }
  
      }
      deletStudent(id){
        axios.get(`http://127.0.0.1:3333/taskmanagement/api/student/deleteStudent/${id}`)
        .then(res => {
          console.log(res.data)
          const pro = this.state.students.filter((val)=>val.id != id)
          console.log(pro)
          // const projects = res.data;
           this.setState({ 
            students : [...pro]
            });
        })
      }
    render() {
        return (
          <Container>
            <Row>
              <Col md="4"><h2 style={{color:"#00674c",marginTop:"0.5rem"}}><FaUsers />&nbsp;Student Workers</h2></Col>
              <Col md="2"></Col>
              <Col md="3">
              <input type="text" style = {{"marginTop":"0.7rem"}} class="form-control" placeholder="Search students" value={this.state.value} onChange={(e) => {this.handleChange(e)}} />
              </Col>
              <Col md="3" style={{paddingLeft:"120px",marginTop:"0.7rem",marginBottom:"0rem"}}>
                {/* <Link className="createStudentBtn" to={`/dashboard/createStudent`}><FaPlus />
                &nbsp;Create New</Link></Col> */}
                 <Link  to={`/dashboard/createStudent`}><Button className="createStudentBtn1" ><FaPlus />&nbsp;Create New</Button>
                 </Link>
                  </Col>
                  </Row>
         
         <Row className="studentRow">
            <Table>
  <thead>
    <tr>
    <th>S.No</th>
      <th>Student Name</th>
      <th>Projects Assigned</th>
      <th>Email</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    { 
    this.state.students.map(student => {if(student.role!="admin")
     return <tr>
      <td>1</td>
      <td>{student.firstName}</td>
      <td>projects</td>
      <td>{student.email}</td>
      <td>{student.password}<Link className="viewBtn"></Link></td>
      <td> <Link className="projectName" to={`/dashboard/student/${student.id}`}> <FaPencilAlt /></Link>
      <Link className="viewBtn" onClick={()=> this.deletStudent(student.id) }><FaTrashAlt /></Link>
      </td>
      
    </tr>  
    }
    )}
    </tbody>
    </Table>
    </Row>
    </Container>  

// <Container>
// <Row >
//   <Col md="9"></Col>
//   <Col md="1">View By: </Col>
//   <Col md="2">
//   <Form>
// <Form.Group controlId="exampleForm.SelectCustomSizeSm">
// {/* <Form.Label>View By:</Form.Label> */}
// <Form.Control as="select" size="md" custom>
// <option>last 30 days</option>
// <option>last 60 days</option>
// <option>last 90 days</option>
// </Form.Control>
// </Form.Group>
// </Form>
// </Col>
// </Row>
// <Row className="orderHeader">
// <Col>Order Date</Col>
// <Col>Order Number</Col>
// <Col>Order Status</Col>
// </Row>
// <Row className="orderDetails">
// <Col>September 30</Col>
// <Col  className="orderNumber">#9876545678987</Col>
// <Col style={{color:"Green"}}><h6>Shipped</h6></Col>
// </Row>
// </Container>

        );
    }
}
export default Student;