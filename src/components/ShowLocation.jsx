import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";

class ShowLocation extends React.Component {
  static contextType = LocationsContext;
  state = this.props.location.state;

  deleteLocation = async (id) => {
    this.context.dispatch("delete", id)
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.props.history.push("/main")
  }
    renderLocation = (location) => {
      console.log(location.id)
      console.log(location.image)
      return(
        <>
          <h1>{location.name}</h1>
          {location.image && <img src={location.image} alt={location.name} />}
          <Link to={`${location.id}/edit`}>Edit</Link>
          <button onClick={() => this.deleteLocation(location.id)}>Delete</button>
        </>
      )
    }

    getLocation = async () => {
      const id = this.props.match.params.id
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}`);
      const location  = await response.json();
      console.log(location)
      if (location.status >= 400) {
        this.props.history.push("/notfound")
      } 
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