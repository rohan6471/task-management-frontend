import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import '../css/dashboard.css'

const Side = props => {


    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/project"
            onSelect={selectedKey => {
                if(selectedKey == "link-2"){
                    props.history.push('/');
                }

            }}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/dashboard/project">Project</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/dashboard/student" eventKey="link-1">Student</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Logout</Nav.Link>
            </Nav.Item>
            
            </Nav>

        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar