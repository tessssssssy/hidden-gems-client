import React from 'react';
import { Link, NavLink } from "react-router-dom";


class Navbar extends React.Component {
  render () {
    return (
      <nav className="Navbar">
        <NavLink to="/main">Home</NavLink>
        <NavLink to="/location/create">Add Location</NavLink>
        <NavLink to="/login" data-testid="login">Login</NavLink>
        <NavLink to="/signup"data-testid="signup">Login</NavLink>
      </nav>
    )
  }
}

export default Navbar;