import React from "react";
import { Link, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import Comments from "./Comments";
import RatingBar from "./RatingBar";
import UploadImage from "./UploadImage";

class ShowLocation extends React.Component {
  static contextType = LocationsContext;
  state = { location: this.props.location.state, comments: [] };

  deleteLocation = async (id) => {
    this.context.dispatch("delete", id);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.props.history.push("/main");
  };

  renderLocation = (location) => {
    let currentUser = sessionStorage.getItem("currentUser");

    return (
      <div>
        <h1>{location.name}</h1>
        <span>Ratings: {location.ratings} (based on {location.numberOfRatings} user)</span>
        <RatingBar location_id={location.id} reload={this.loadFromRails}/>
        <UploadImage location_id={location.id} reload={this.loadFromRails}/>
        {location.photos && <img src={location.photos[0].image} alt={location.name} />}
        {location.username === currentUser && (
          <>{console.log(location.id)}
            <Link to={`/location/${location.id}/edit`}>Edit</Link>
            <button onClick={() => {this.deleteLocation(location.id); this.context.dispatch("delete",location.id)}}>
              Delete
            </button>
          </>
        )}
      </div>
    );
  };


  getLocation = async () => {
    console.log(this.state)
    const id = this.props.match.params.id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${id}`
    );
    const { location, comments } = await response.json();
    if (location.status >= 400) {
      this.props.history.push("/notfound");
    }
    this.context.dispatch("update", {...location});
    this.setState({ location: location, comments: comments });
  };

  loadFromRails = () => {
    this.getLocation();
  };

  render() {
    const { location, comments } = this.state;
    console.log(location);
    return (
      <>
        {location ? this.renderLocation(location) : this.loadFromRails()}
        <Comments
          {...this.props}
          comments={this.state.comments}
          location_id={this.props.match.params.id}
        />
      </>
    );
  }
}

export default ShowLocation;
