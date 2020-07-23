import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";

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
      <>
        <NavLink to="/main">Home</NavLink>
        <NavLink to="/location/create">Add Location</NavLink>
        <NavLink
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
        <span>Logged in as {this.context.currentUser}</span>
      </>
    );
  }
}

export default LoggedInNav;
