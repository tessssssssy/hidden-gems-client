import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";

class LoggedOutNav extends React.Component {
  static contextType = LocationsContext;
  render() {
    return (
      <>
        <NavLink to="/main">Home</NavLink>
        <NavLink to="/login" data-testid="login">
          Login
        </NavLink>
        <NavLink to="/signup" data-testid="signup">
          Signup
        </NavLink>
      </>
    );
  }
}

export default LoggedOutNav;