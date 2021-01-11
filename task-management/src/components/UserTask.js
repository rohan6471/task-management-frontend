import React, { Component } from 'react';
import {Container, Row, Col, Card, Form, Button , Table} from "react-bootstrap";
import {DataContext} from './Context'
import {Link} from 'react-router-dom'
import axios from 'axios';
class UserTask extends Component {
    constructor(props){
        super(props);
        this.state = {
          tasks: [{"startDate":"","expectedEndDate":""}]
        }
      }
      static contextType = DataContext;
      componentDidMount() {

          console.log("cameee")
        const {user} = this.context;
        axios.get(`task/getUserTask/${this.props.match.params.id}/${JSON.parse(localStorage.getItem('user_details')).id}`)
          .then(res => {
              console.log("entered")
              console.log(res)
            const student = res.data;
            this.setState({ tasks : [ ...student]
             });
            console.log(this.state.tasks)
          })
      }
      handleChange(e,k) {
        console.log(e.target.value)
        if(e.target.value != "select"){
        axios.get(`task/updateStatus/${k}/${e.target.value}`).then(res=>{
          console.log("cameeee")
          axios.get(`getUserTask/${this.props.match.params.id}/${JSON.parse(localStorage.getItem('user_details')).id}`)
          .then(res => {
              console.log("entered")
              console.log(res)
            const student = res.data;
            this.setState({ tasks : [ ...student]
             });
            console.log(this.state.tasks)
          })
          console.log(res.data)
         
        })
      



      }
      }
    render() { 
        return ( 
            <Container>
            <Row>
                <Col md = "8"></Col>
        <Col md = "4" className="text-right"> <h4> Welcome Satish</h4></Col>
        </Row>
        <Row>
        <Table>
  <thead>
    <tr>
    <th>TaskName</th>
      <th>Task Description</th>
     
      <th>Startdate</th>
      <th>Enddate</th>
      <th>Status</th>
      
    </tr>
  </thead>
  <tbody>
    { 
    this.state.tasks.map(task => {
     return <tr>
     
      <td>{task.taskName}</td>
      <td>{task.description}</td>
      <td>{task.startDate.split('T')[0]}</td>
      <td>{task.expectedEndDate.split('T')[0]}</td>
      <td>
    
          <Form.Control
                  as="select"
                  onChange={(e) => {
                    this.handleChange(e, task.id);
                  }}
                  value = {task.status}
                  size="md"
                >
                  <option value="NewAssignee">NewAssignee</option>
                  <option value="Inactive">Inactive</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                  
                </Form.Control>
               </td>
      
      
    </tr>  
    }
    )}
    </tbody>
    </Table>
        </Row>
        </Container>
         );
    }
}
 
export default UserTask;