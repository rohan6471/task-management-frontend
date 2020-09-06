import React, { Component } from "react"
import {Form,Button,Row,Col,Container} from'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css'

class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:''
  }
  this.onEmailChange=this.onEmailChange.bind(this)
  this.onPassChange=this.onPassChange.bind(this)
  
 }

 onEmailChange = event => {
     console.log("entered input")
    this.setState({
      username: event.target.value
    })
  };

  onPassChange = event => {
    console.log("entered input")
   this.setState({
     password: event.target.value
   })
 };
 handleClick(event){
  this.props.history.push('/Project');
    
    var payload={
    "email":this.state.username,
    "password":this.state.password
    }
    axios.post('http://127.0.0.1:3333/taskmanagement/api/auth/login', payload)
    .then(function (response) {
    console.log(response.data);
    if(response.data.message === "success"){
    console.log("Login successfull");
    alert("Login Successfull")
   
    }
    else if(response.data === "failure"){
    console.log("Username password do not match");
    alert("username password do not match")
    }
    else{
    console.log("Username does not exists");
    alert("Username does not exist");
    }
    })
    .catch(function (error) {
    console.log(error);
    });
    }
    
render() {
    return (
<Container>
<Row>
    <Col></Col>
    <Col >
    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={this.onEmailChange} value={this.state.username}/>
   </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={this.onPassChange} value={this.state.password}/>
  </Form.Group>
   <Button variant="primary" type="submit" onClick={(event) => this.handleClick(event)}>
    Submit
  </Button>
</Form>
    
    </Col>
    <Col></Col>
  </Row>
</Container>
); 
}
}
export default Login;