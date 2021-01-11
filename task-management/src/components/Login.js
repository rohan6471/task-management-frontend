import React, { useState,useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "../css/login.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { DataContext } from './Context'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00674C",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  MuiContainerRoot: {
    marginLeft: "200px !important"
  },
  textInput: {
    borderColor: "green !important",
    text: "green",
  },
  floatingLabelFocusStyle: {
    color: "green",
  },
}));

const themeStyles = createMuiTheme({
  palette: {
    primary: green,
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #026745 30%, #009900 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        marginTop: "7px",
      },
    },
  },
});

export default function Login() {
  let history = useHistory();
  const { addUserDetails } = useContext(DataContext)
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    
   // history.push("/dashboard/Project");
    e.preventDefault();
    console.log(email, "email value");
    console.log(password, "passwrd value");
    axios
      .post("auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res, "here is the respone");
        console.log(res.data, "respone.data");
        if (res.data.message === "success" && res.data.role === "admin") {

          document.getElementById("error").innerHTML = ""
          addUserDetails(res.data.value)
          axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.tokenValue;
        localStorage.setItem("access_token", "Bearer " + res.data.tokenValue);
        localStorage.setItem("user_details", JSON.stringify(res.data.value));
           history.push("/dashboard/Project");
        }
        else if (res.data.message === "success" && res.data.role === "user") {

          document.getElementById("error").innerHTML = ""
          addUserDetails(res.data.value)
          axios.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.tokenValue;
        localStorage.setItem("access_token", "Bearer " + res.data.tokenValue);
        localStorage.setItem("user_details", JSON.stringify(res.data.value));
           history.push("/user/project");
        }
        
        else if (res.data.message === "failure") {

          document.getElementById("error").innerHTML = "Incorrect Username and Password"

        } else {
          console.log("doesnt exist");

        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={themeStyles}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {/* <ValidatorForm> */}
          <form className={classes.form} Validate onSubmit={submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoFocus
              InputProps={{
                classes: {
                  notchedOutline: classes.textInput,
                },
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                classes: {
                  notchedOutline: classes.textInput,
                },
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
            />

            <Button type="submit" fullWidth onClick={submit}>
              Sign In
            </Button>
            <div id="error" style={{ color: "red", margin: "10px" }}></div>
            <Grid container>
              <Grid item xs>
                <Link  to={"/forgotpassword/${id}"} color="primary">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
          {/* </ValidatorForm> */}
        </div>
      </ThemeProvider>
    </Container>
  );
}




/*
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
  this.props.history.push('/dashboard/Project');

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
    <Col ></Col>
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
    <Col ></Col>
  </Row>
</Container>
);
}
}
export default Login; */