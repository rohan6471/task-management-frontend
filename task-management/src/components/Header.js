import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap';
import '../css/Header.css';
import '../images/logo-n.svg'



export default class Header extends Component {

  render() {
    return (
        
        <Navbar className="back">
             <Navbar.Brand>
          <img src={require("../images/logo-n.svg")} alt=" " style={{width:50, marginTop: -7}} />
          </Navbar.Brand>
        <h2>Task Management</h2>       
    
      </Navbar>
        );
  }
}