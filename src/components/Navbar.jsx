import React from 'react';
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";


class Navbar extends React.Component {
  static contextType = LocationsContext
  render () {
    return (
      <nav className="Navbar">
        <NavLink to="/main">Home</NavLink>
        <NavLink to="/location/create">Add Location</NavLink>
        <NavLink to="/login" data-testid="login">Login</NavLink>
        <NavLink to="/signup"data-testid="signup">Signup</NavLink>
        <NavLink
        to="/main"
        onClick={() => {
          localStorage.removeItem("token");
          sessionStorage.removeItem('currentUser');
        }}
      >
        Logout
      </NavLink>
      </nav>
    )
  }
}

export default Navbar;