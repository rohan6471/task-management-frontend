import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import '../css/dashboard.css'
import { FaFolderOpen, FaUsers, FaSignOutAlt } from "react-icons/fa"

const UserSide = props => {


    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                activeKey="/project"
                onSelect={selectedKey => {
                    if (selectedKey == "link-2") {
                        props.history.push('/');
                    }

                }}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link className="sideLink" href="/user/project"><FaFolderOpen />&nbsp;Projects</Nav.Link>
                </Nav.Item>
               
                <Nav.Item>
                    <Nav.Link className="sideLink" eventKey="link-2"><FaSignOutAlt />&nbsp;Logout</Nav.Link>
                </Nav.Item>

            </Nav>

        </>
    );
};
const UserSidebar = withRouter(UserSide);
export default UserSidebar