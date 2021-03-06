import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios";
import App from './App';
import Login from './components/Login';
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Project from './components/Project.js';
import Student from './components/Student.js';
import Task from './components/Task.js';
import CreateProject from './components/CreateProject.js';
import EditProject from './components/EditProject.js';
import EditTask from './components/EditTask.js';
import CreateStudent from './components/CreateStudent.js';
import EditStudent from './components/EditStudent.js';
import CreateTask from './components/CreateTask.js'
import ViewTask from './components/ViewTask.js'
import * as serviceWorker from './serviceWorker';
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/sidebar.js";
import UserSidebar from "./components/UserSidebar.js";
import UserProject from "./components/UserProject.js";
import UserTask from "./components/UserTask.js";
import './css/dashboard.css'
import {DataProvider} from './components/Context.js'

axios.defaults.baseURL = 'http://127.0.0.1:3333/taskmanagement/api/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <DataProvider>
  <Router>
     <div><Header />
     {
   !localStorage.getItem('access_token') ? <Redirect  to="/login"  /> : ''
}   
     <Route exact path="/">
     
     <Redirect to="/login" />
     </Route>
      <Route exact path="/login" component={Login}/>
      <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">   
                <Route   path="/dashboard" component={Sidebar}/>
                <Route   path="/user" component={UserSidebar}/>
                  
                </Col>
                <Col  xs={10} id="page-content-wrapper">
             
      <Route exact path="/Dashboard" component={Dashboard}/>
      <Route exact path="/dashboard/project" component={Project}/>
      <Route exact path="/user/project" component={UserProject}/>
      <Route path="/dashboard/tasks/:id" component={Task} />
      <Route exact path="/user/tasks/:id" component={UserTask}/>
      <Route path="/dashboard/projectDetail/:id" component={EditProject} />
      <Route path="/dashboard/createProject" component={CreateProject} />
      <Route exact path="/dashboard/student" component={Student}/>
      <Route path="/dashboard/student/:id" component={EditStudent} />
      <Route path="/dashboard/createStudent" component={CreateStudent} />
      <Route path="/dashboard/project/createTask/:id" component={CreateTask} />
      <Route path="/dashboard/EditTask/:id" component={EditTask} />
      <Route path="/dashboard/viewTask" component={ViewTask} />
                </Col> 
            </Row>

        </Container>
      </div>
    </Router></DataProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
