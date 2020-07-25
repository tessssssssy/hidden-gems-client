import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import { Navbar, Nav } from "react-bootstrap";
import '../stylesheets/Navbar.scss';

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
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/main">Home</NavLink>
            <NavLink className="nav-link" to="/location/create">Add Location</NavLink>
            <NavLink
            className="nav-link"
              to="/main"
              onClick={() => {
                console.log("logging out");
                localStorage.removeItem("token");
                sessionStorage.removeItem("currentUser");
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
