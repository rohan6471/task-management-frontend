import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button,Accordion} from "react-bootstrap";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt,FaFolderOpen, FaTrashAlt} from "react-icons/fa"
import {Link} from 'react-router-dom'
import axios from 'axios';
import "../css/Project.css"

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks :[]
    }

  }
  componentDidMount() {
    axios.get(`task/getTasks/${this.props.match.params.id}`)
      .then(res => {
        const taskData = res.data;
        this.setState({ tasks : taskData  });
      })
  }
  deletProduct(id){
    if (window.confirm("Are you sure you want to delet Task!")) {
    axios.get(`task/deleteTask/${id}`)
    .then(res => {
      console.log(res.data)
      const pro = this.state.tasks.filter((val)=>val.id != id)
      console.log(pro)
      // const projects = res.data;
       this.setState({ 
         tasks : [...pro]
        });
    })
  }
  }
  handleChange(event) {
    console.log("entered searh product")
    console.log(event.target.value)
    //this.setState({value: event.target.value});
    axios.get(`task/search/${this.props.match.params.id}/${event.target.value}`)
    .then(res => {
      this.setState({
        tasks:[...res.data]
      })
   
    })

  }


  render() {
    return (
      <Container>
         
              <Row>
              <Col md="4"><h2 style={{color:"#00674c",marginTop:"0.5rem"}}><FaFolderOpen />&nbsp;Tasks</h2></Col>
              <Col md="2"></Col>
              <Col md="3">
              <input type="text" style = {{"marginTop":"0.7rem"}} class="form-control" placeholder="Search Task" value={this.state.value} onChange={(e) => {this.handleChange(e)}} />
              </Col>
              <Col md="3" style={{paddingLeft:"120px",marginTop:"0.5rem",marginBottom:"0.5rem"}}>
                <Link className="projectBtn" to={`/dashboard/project/createTask/${this.props.match.params.id}`}><FaPlus />&nbsp;Create New</Link></Col>
                    </Row>
          
         
          { 
            this.state.tasks.map(project => 
              <Accordion style={{padding:"0.5em"}}>
  <Card >
    <Card.Header className="projectCard">
    <Row>   
            <Col md="8" className="projectName">
     
     <h5><FaCaretRight />{project.taskName}</h5>
                
             </Col>
          <Col md="1"></Col>
          <Col md="3" style={{display: "flex",justifyContent: "center"}}>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <Button className="viewBtn" variant="secondary"><FaEye  /></Button> 
            </Accordion.Toggle>    
            <Link className="projectName" to={`/dashboard/EditTask/${project.id}`} > <Button className="" variant="btn"><FaPencilAlt /></Button> </Link>
          <Button className="viewBtn" variant="secondary" onClick={()=> this.deletProduct(project.id) }><FaTrashAlt /></Button></Col>
          </Row>
    </Card.Header>
    <Accordion.Collapse style={{padding:"20px"}} eventKey="0">
     
      <Row>
       <Col md="3">
       Start Date:  {project.startDate.split("T")[0]}
        </Col>
        <Col md="3">
        Expected End Date :  {project.expectedEndDate.split("T")[0]}
        </Col>
        <Col md="3">
       Status :  {project.status}
        </Col>
       
       </Row>
    </Accordion.Collapse>
  </Card>
  </Accordion> 
    )}
             </Container>    
    );
  }
}

export default Task;