import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login.js'
import Header from './components/Header.js'
import Dashboard from './components/Dashboard.js'
import Project from './components/Project.js'
import Student from './components/Student.js'
import * as serviceWorker from './serviceWorker';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {BrowserRouter as Router,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/sidebar.js";
import './css/dashboard.css'

ReactDOM.render(
  <Router>
     <div><Header />
     
      <Route exact path="/" component={Login}/>
      <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <Sidebar />
                </Col>
                <Col  xs={10} id="page-content-wrapper">

      <Route exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/project" component={Project}/>
      <Route exact path="/student" component={Student}/>
     
                </Col> 
            </Row>

        </Container>
      </div>
    </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
