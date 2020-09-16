import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import axios from 'axios';


class Project extends Component {
    constructor(props){
      super(props);
      this.state = {
        projects: []
      }
    }
    componentDidMount() {
      axios.get(`http://127.0.0.1:3333/taskmanagement/api/project/getProjects`)
        .then(res => {
          const projects = res.data;
          this.setState({ projects });
        })
    }

    render() {
        return (
          <div>
          <Link to={`/dashboard/createProject`}><Button style={{marginLeft:"960px",marginTop:"20px"}} variant="primary">Create Project</Button></Link>
         
          { 
            this.state.projects.map(project => 

            
            
            <Card style={{marginTop:"10px"}}>
              <Card.Body>
              <Link to={`/dashboard/project/${project.id}`}><h4>{project.title}</h4></Link>
              <span style={{marginRight:"700px"}}>{project.title}</span>
              <Button variant="secondary">Edit </Button>
              <Button variant="danger">Delete</Button>
                 
              </Card.Body>
             
              </Card>
             
              )}
              </div>
               
        );
    }
}
export default Project;