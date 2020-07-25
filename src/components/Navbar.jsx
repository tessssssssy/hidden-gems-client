import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';
import'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component {
  static contextType = LocationsContext;
  render() {
    return (
      <>
        {sessionStorage.getItem("currentUser") ? (
          <LoggedInNav history={this.props.history} context={this.context} />
        ) : (
          <LoggedOutNav />
        )}
      </>
    );
  }
}

export default Navbar;

