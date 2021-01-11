import React, { Component } from 'react';
import {Container, Row, Col, Card, Form, Button , Table} from "react-bootstrap";
import {DataContext} from './Context'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
class UserProject extends Component {
    constructor(props){
        super(props);
        this.state = {
          projects: [{ "user_project" : [{"duedate":""}]}]
        }
      }
      static contextType = DataContext;
      componentDidMount() {

          console.log("cameee")
        const {user} = this.context;
        const userDetails = JSON.parse(localStorage.getItem('user_details'))
        console.log(user)
        axios.get(`student/userProjects/${userDetails.id}`)
          .then(res => {
              console.log("entered")
            const student = res.data.data;
            this.setState({ projects : [ ...student]
             });
            console.log(this.state.projects)
          })
      }
      fileDownload = (event,fileName) => {
        console.log("download valuee   "+event)
        axios({
          url : `project/download/${event}`,
          method : 'GET',
          responseType : 'blob'
        })
        .then(res => {
          console.log(res)
       
            console.log("entered blob objecttt")
            let url = window.URL.createObjectURL(new Blob([res.data]));
            console.log(url)
            let a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
         // });

        })
        .catch((err)=>{
          NotificationManager.error(
            "This project has no files",
            " ",
            2000)
        })
      
      };
    render() { 
        return ( 
            <Container>
            <Row>
                <Col md = "8"></Col>
        <Col md = "4" className="text-right"> <h4> Welcome {this.state.projects[0].firstName}</h4></Col>
        </Row>
        <Row>
        <Table>
  <thead>
    <tr>
    <th>ProjectName</th>
      <th>Project Description</th>
     
      <th>Duedate</th>
      <th>Status</th>
      <th>Tasks</th>
      <th>Download Attachments</th>
    </tr>
  </thead>
  <tbody>
    { 
    this.state.projects[0].user_project.map(student => {
     return <tr>
     
      <td>{student.name}</td>
      <td>{student.description}</td>
      <td>{student.duedate.split('T')[0]}</td>
      <td>{student.status}</td>
      <td> <Link className="projectName" style = {{borderBottom: "1px solid black"}} to={`/user/tasks/${student.id}`}> Tasks List</Link> </td>
      <td><Button  variant="secondary" size="sm" onClick ={()=>this.fileDownload(student.id,student.files)} >Download Files</Button></td>
    
     

      
    </tr>  
    }
    )}
    </tbody>
    </Table>
        </Row>
        <NotificationContainer />
        </Container>
         );
    }
}
 
export default UserProject;