import React, { Component } from "react"
import{Button,Card, Container, Row, Col} from "react-bootstrap";
import {FaCaretRight,FaEye} from "react-icons/fa"

class CreateProject extends Component {
    constructor(props){
        super(props);
        this.state = {
          projects: []
        }
      }
      render() {
        return (
          <Card style={{marginTop:"10px"},{border:"0px"}}>        
          <Card.Body>
          <Container>
          <Row>   
            <Col>
          <h4><FaCaretRight />Project 1</h4>
          </Col>
          <Col></Col>
          <Col style={{marginLeft:"25em"}}><Button variant="secondary"><FaEye />&nbsp;View Tasks</Button> </Col> 
          </Row>
         </Container>                    
          </Card.Body>  
          </Card>
         
        )
      }
}
export default CreateProject;