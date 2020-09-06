// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
import React, { Component } from "react"
import {Form,Button,Row,Col} from'react-bootstrap';
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
console.log('enteredddd')
    // var apiBaseUrl = "http://localhost:4000/api/";
    // var self = this;
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
    // var uploadScreen=[];
    // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
    // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
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
        <Form>
        
        <Form.Group as={Row} controlId="formBasicEmail">
           
        <Col lg="2">
            
        </Col>
  
    <Form.Label column lg="2">Email address</Form.Label>
   
    <Col lg="4">
    <Form.Control size="lg" type="email" placeholder="Enter email" onChange={this.onEmailChange} value={this.state.username}/>
    <Form.Text className="text-muted">
      
    </Form.Text>
    </Col>
  </Form.Group>
  
  <Form.Group as={Row} controlId="formBasicPassword">
  <Col lg="2"></Col>
  
    <Form.Label column lg="2">Password</Form.Label>
    <Col lg="4">
    <Form.Control size="lg" type="password" placeholder="Password" onChange={this.onPassChange} value={this.state.password}/>
    </Col>      
    <Col lg="4"></Col>
    <Col lg="4"></Col>
    <Col lg="4 butn">
  <Button variant="primary" type="submit" onClick={(event) => this.handleClick(event)}>
    Submit
   </Button>
   </Col>
 
   </Form.Group>
 
    
</Form>
    /* // <div className="col-lg-12 loginform ">
    //     <form onSubmit={(event) => this.handleClick(event)}>
   
    //     <label>User Name</label>
    //     <input type="text" data-test="username" value={this.state.username}  />
    //     <br />
    //     <label>Password</label>
    //     <input type="password" data-test="password" value={this.state.password}  />
    //     <br />
    //     <input type="submit" value="Log In" data-test="submit" />
    //     </form>
    //     </div> */
   
        
        );
        
        }
}

        export default Login;


/* /* //     return ( */
/* //       <div>
//           <div className="card">
//             <TextField */
//              hintText="Enter your Username"
//              floatingLabelText="Username"
//              onChange = {(event,newValue) => this.setState({username:newValue})}
//              />
//            <br/>
//              <TextField
//                type="password"
//                hintText="Enter your Password"
//                floatingLabelText="Password"
//                onChange = {(event,newValue) => this.setState({password:newValue})}
//                />
//              <br/>
//              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
//          </div>
//         </div>
//     );
//   }
// }
// const style = {
//  margin: 15,
// };
