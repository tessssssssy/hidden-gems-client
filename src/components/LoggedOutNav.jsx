import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import { Navbar, Nav } from "react-bootstrap";
import '../stylesheets/Navbar.scss';

class LoggedOutNav extends React.Component {
  static contextType = LocationsContext;
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/main">Home</NavLink>
            <NavLink className="nav-link" to="/login" data-testid="login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/signup" data-testid="signup">
              Signup
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default LoggedOutNav;
