import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import Comments from "./Comments";

class ShowLocation extends React.Component {
  static contextType = LocationsContext;
  state = {location: this.props.location.state, comments: []} 


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
      return(
        <div>
          <h1>{location.name}</h1>
          <Link to={`${location.id}/edit`}>Edit</Link>
          <button onClick={() => this.deleteLocation(location.id)}>Delete</button>
        </div>
      )
    }

    getLocation = async () => {
      const id = this.props.match.params.id
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}`);
      const { location, comments }  = await response.json();
      if (location.status >= 400) {
        this.props.history.push("/notfound")
      } 
      this.setState({location: location, comments: comments})
    }

    loadFromRails = () => {
      this.getLocation()
    }
    
    render() {
        const {location, comments} = this.state
        return (
          <>
          {location ? this.renderLocation(location) : this.loadFromRails()}
          <Comments comments={this.state.comments} location_id={this.props.match.params.id}/>
          </>
        )

    }
}

export default ShowLocation;