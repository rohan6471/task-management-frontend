  import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import {FaCaretRight,FaEye,FaPlus} from "react-icons/fa"
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../css/Project.css'


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
          <Link to={`/dashboard/createProject`}><Button className="projectBtn"style={{marginLeft:"930px",marginTop:"20px"}} variant="primary"><FaPlus />&nbsp;Create New</Button></Link>
         
          { 
            this.state.projects.map(project => 
              <Card style={{marginTop:"10px"},{border:"0px"}}>        
          <Card.Body>
          <Container>
          <Row>   
            <Col>
            <Link to={`/dashboard/project/${project.id}`}><h4><FaCaretRight />{project.title}</h4></Link>
          </Col>
          <Col></Col>
          <Col style={{marginLeft:"30em"}}><Button variant="secondary"><FaEye />&nbsp;View Tasks</Button> </Col> 
          </Row>
         </Container>                    
          </Card.Body>  
          </Card>

            
           
              )}
              </div>
               
        );
    }
}
export default Project;

 
// <Card style={{marginTop:"10px"}}>
// <Card.Body>
// <Link to={`/dashboard/project/${project.id}`}><h4>{project.title}</h4></Link>
// <span style={{marginRight:"700px"}}>{project.title}</span>
// <Button variant="secondary">Edit </Button>
// <Button variant="danger">Delete</Button>
   
// </Card.Body>

// </Card>


{/* <Card style={{marginTop:"10px"},{border:"0px"}}>        
          <Card.Body>
          <Container>
          <Row>   
            <Col>
            <Link to={`/dashboard/project/${project.id}`}><h4><FaCaretRight />Project 1</h4></Link>
          </Col>
          <Col></Col>
          <Col style={{marginLeft:"30em"}}><Button variant="secondary"><FaEye />&nbsp;View Tasks</Button> </Col> 
          </Row>
         </Container>                    
          </Card.Body>  
          </Card> */}