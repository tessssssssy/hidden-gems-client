import React from 'react';
import { Link, NavLink } from "react-router-dom";

import { LocationsContext } from "../context/LocationsContext";

class Navbar extends React.Component {
  render () {
    return (
      <nav className="Navbar">
        <NavLink to="/main">Home</NavLink>
        <NavLink to="/location/create">Add Location</NavLink>
      </nav>
    )
  }
}

export default Navbar;