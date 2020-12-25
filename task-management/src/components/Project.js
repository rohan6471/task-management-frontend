  import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button,Accordion} from "react-bootstrap";
import { withRouter } from "react-router";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt,FaFolderOpen, FaTrashAlt} from "react-icons/fa"
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
    deletProduct(id){
      axios.get(`http://127.0.0.1:3333/taskmanagement/api/project/deleteProject/${id}`)
      .then(res => {
        console.log(res.data)
        const pro = this.state.projects.filter((val)=>val.id != id)
        console.log(pro)
        // const projects = res.data;
         this.setState({ 
           projects : [...pro]
          });
      })
    }
    handleChange(event) {
      console.log("entered searh product")
      console.log(event.target.value)
      //this.setState({value: event.target.value});
      axios.get(`http://127.0.0.1:3333/taskmanagement/api/project/search/${event.target.value}`)
      .then(res => {
        this.setState({
          projects:[...res.data]
        })
     
      })

    }

    render() {
        return (
         <Container>
         
              <Row>
              <Col md="4"><h2 style={{color:"#00674c",marginTop:"0.5rem"}}><FaFolderOpen />&nbsp;Projects</h2></Col>
              <Col md="2"></Col>
              <Col md="3">
              <input type="text" style = {{"marginTop":"0.7rem"}} class="form-control" placeholder="Search projects" value={this.state.value} onChange={(e) => {this.handleChange(e)}} />
              </Col>
              <Col md="3" style={{paddingLeft:"120px",marginTop:"0.5rem",marginBottom:"0.5rem"}}>
                <Link className="projectBtn" to={`/dashboard/createProject`}><FaPlus />&nbsp;Create New</Link></Col>
                    </Row>
          
         
          { 
            this.state.projects.map(project => 
              <Accordion style={{padding:"0.5em"}}>
  <Card >
    <Card.Header className="projectCard">
    <Row>   
            <Col md="8" className="projectName">
     
      <Link className="projectName" to={`/dashboard/tasks/${project.id}`}><h5 className="projectName1"><FaCaretRight />{project.name}</h5></Link>
                
             </Col>
          <Col md="1"></Col>
          <Col md="3" style={{display: "flex",justifyContent: "center"}}>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <Button className="viewBtn" variant="secondary"><FaEye  /></Button> 
            </Accordion.Toggle>    
            <Link className="projectName" to={`/dashboard/projectDetail/${project.id}`}> <Button className="viewBtn" variant="secondary"><FaPencilAlt /></Button> </Link>
          <Button className="viewBtn" variant="secondary" onClick={()=> this.deletProduct(project.id) }><FaTrashAlt /></Button></Col>
          </Row>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body><small>Due on {project.duedate.split("T")[0]}</small></Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion> 
    )}
             </Container>    

          );
    }
}
export default Project;

 