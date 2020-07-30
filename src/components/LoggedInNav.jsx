import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import { Navbar, Nav } from "react-bootstrap";
import '../stylesheets/Navbar.scss';
import icon from "../images/gem_icon_color.png";

class LoggedInNav extends React.Component {
  static contextType = LocationsContext;
  componentDidMount() {
    this.context.dispatch(
      "current user",
      sessionStorage.getItem("currentUser")
    );
  }
  render() {
    return (
      <Navbar className="navbar" bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <img style={{width: "30px", height: "30px"}} src={icon}/>
            <NavLink className="nav-link" to="/main">Home</NavLink>
            <NavLink className="nav-link" to="/location/create">Add Location</NavLink>
            <NavLink
            className="nav-link"
              to="/main"
              onClick={() => {
                console.log("logging out");
                localStorage.removeItem("token");
                sessionStorage.clear();
                this.context.dispatch("current user", false);
              }}
            >
              Logout
            </NavLink>      
          </Nav>
        </Navbar.Collapse>
        <span className="logged-in-user">Logged in as {this.context.currentUser}</span>
      </Navbar>
    );
  }
}

export default LoggedInNav;
