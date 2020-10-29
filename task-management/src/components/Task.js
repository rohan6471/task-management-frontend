import React, { Component } from "react"
import {Container, Row, Col, Card, Form, Button,Accordion} from "react-bootstrap";
import {FaCaretRight,FaEye,FaPlus,FaPencilAlt,FaFolderOpen, FaTrashAlt} from "react-icons/fa"
import {Link} from 'react-router-dom'
import "../css/Project.css"

class Task extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
              <Row>
              <Col md="4"><h2 style={{color:"#00674c",marginTop:"0.5rem"}}><FaFolderOpen />&nbsp;Tasks</h2></Col>
              <Col md="5"></Col>
              <Col md="3" style={{paddingLeft:"120px",marginTop:"0.5rem",marginBottom:"0.5rem"}}><Link className="createStudentBtn" to={`/dashboard/createProject`}><FaPlus />&nbsp;Create New</Link></Col>
                    </Row>
          
         
              <Accordion style={{padding:"0.5em"}}>
  <Card >
    <Card.Header className="projectCard">
    <Row>   
            <Col md="8" className="projectName">
     
      <Link className="projectName" ><h5 className="projectName1"><FaCaretRight />Task 1</h5></Link>
                
             </Col>
          <Col md="2"></Col>
          <Col md="2" style={{display: "flex",justifyContent: "center"}}>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <Button className="viewBtn" variant="secondary"><FaEye  /></Button> 
            </Accordion.Toggle>    
          <Button className="viewBtn" variant="secondary"><FaPencilAlt /></Button> </Col>
          </Row>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>hi</Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion> 
 
   </Container>
    );
  }
}

export default Task;