import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button , Table} from "react-bootstrap";
import { withRouter } from "react-router";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt} from "react-icons/fa"
import {Link} from 'react-router-dom'
import axios from 'axios';

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
  
    render() {
        return (
          <Container>
            <Row>
          <Link style={{marginLeft:"930px",marginTop:"20px"}}  to={`/dashboard/createStudent`}><FaPlus />&nbsp;Create New</Link>
          </Row>
         
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>Student Name</th>
      <th>Student projects</th>
      <th>Student Email</th>
      <th>Student Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {
    this.state.students.map(student => 
    <tr>
      <td>{student.firstName}</td>
      <td>projects</td>
      <td>{student.email}</td>
      <td>{student.password}</td>
    </tr>
    
    )}
    </tbody>
    </Table>
    </Container>  
        );
    }
}
export default Student;