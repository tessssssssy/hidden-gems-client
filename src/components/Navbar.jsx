import React from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

class Navbar extends React.Component {
  static contextType = LocationsContext;
  render() {
    return (
      <nav className="Navbar" style={{zIndex: 10}}>
        {sessionStorage.getItem("currentUser") ? (
          <LoggedInNav history={this.props.history} context={this.context} />
        ) : (
          <LoggedOutNav />
        )}
      </nav>
    );
  }
}

export default Navbar;
