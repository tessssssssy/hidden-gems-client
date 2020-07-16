import React from 'react';
import { Link } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";

class ShowLocation extends React.Component {
  state = this.props.location.state;

    renderLocation = (location) => {
      console.log(location.id)
      return(
        <>
          <h1>{location.name}</h1>
          <Link to={`${location.id}/edit`}>Edit</Link>
        </>
      )
    }

    getLocation = async () => {
      const id = this.props.match.params.id
      const response = await fetch(`http://localhost:3000/locations/${id}`);
      const location  = await response.json();
      this.setState(location)
    }

    loadFromRails = () => {
      this.getLocation()
    }
    
    render() {
        const location = this.state
        return (
          <>
          {location ? this.renderLocation(location) : this.loadFromRails()}
          </>
        )

    }
}

export default ShowLocation;