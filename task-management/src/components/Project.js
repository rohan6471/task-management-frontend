  import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button,Accordion} from "react-bootstrap";
import { withRouter } from "react-router";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt,FaFolderOpen, FaTrashAlt} from "react-icons/fa"
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../css/Project.css'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Project extends Component {
    constructor(props){
      super(props);
      this.state = {
        projects: []
      }
    }
    componentDidMount() {
      axios.get(`project/getProjects`)
        .then(res => {
          const projects = res.data;
          this.setState({ projects });
        })
    }
    deletProduct(id){
      if (window.confirm("Are you sure you want to delet Project!")) {
      axios.get(`project/deleteProject/${id}`)
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
    }
    handleChange(event) {
      console.log("entered searh product")
      console.log(event.target.value)
      //this.setState({value: event.target.value});
      axios.get(`project/search/${event.target.value}`)
      .then(res => {
        this.setState({
          projects:[...res.data]
        })
     
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
          console.log(res)
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
            <Link className="projectName" to={`/dashboard/projectDetail/${project.id}`}> <Button className="" variant="btn"><FaPencilAlt /></Button> </Link>
          <Button className="viewBtn" variant="secondary" onClick={()=> this.deletProduct(project.id) }><FaTrashAlt /></Button></Col>
          </Row>
    </Card.Header>
    <Accordion.Collapse style={{padding:"20px"}} eventKey="0">
      <Row>
       <Col md="3">
        Due on :  {project.duedate.split("T")[0]}
        </Col>
        <Col md="3">
        Project Status :  {project.status}
        </Col>
        <Col md="3">
       Assigned To :  {project.assignTo}
        </Col>
        <Col md="3">
        <Button  variant="secondary" size="sm" onClick ={()=>this.fileDownload(project.id,project.files)} >Project Files</Button>
        </Col>
       </Row>
    </Accordion.Collapse>
  </Card>
  </Accordion> 
    )}
     <NotificationContainer />
             </Container>    

          );
    }
}
export default Project;

 