import React from "react";
import { Link, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import Comments from "./Comments";
import { Rating } from 'semantic-ui-react'
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
    console.log(location.id);
    console.log(location.image);
    let currentUser = sessionStorage.getItem("currentUser");

    return (
      <div>
        <h1>{location.name}</h1>
        <span>Ratings: {location.ratings}</span>
        {currentUser && (
          <>
          <Rating maxRating={5} onRate={this.handleRate} />
          <pre hidden>{JSON.stringify(this.state, null, 2)}</pre>
          </>
        )}
        {location.image && <img src={location.image} alt={location.name} />}
        {location.user === currentUser && (
          <>
            <Link to={`${location.id}/edit`}>Edit</Link>
            <button onClick={() => this.deleteLocation(location.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    );
  };

  handleRate = (e, { rating, maxRating }) => {
    this.setState({rating, maxRating})
    this.submitRating(rating)

  }

  submitRating = async (rating) => {
        const data = { ratings: {stars: rating, location_id: this.state.location.id } };
        console.log(data)
    console.log(JSON.stringify(data))
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.location.id}/ratings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );
  }
  getLocation = async () => {
    const id = this.props.match.params.id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${id}`
    );
    const { location, comments } = await response.json();
    if (location.status >= 400) {
      this.props.history.push("/notfound");
    }
    this.setState({ location: location, comments: comments });
  };

  loadFromRails = () => {
    this.getLocation();
  };

  render() {
    const { location, comments } = this.state;
    console.log(comments);
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
