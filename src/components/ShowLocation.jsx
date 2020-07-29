import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import { Button } from "semantic-ui-react";
import Comments from "./Comments";
import RatingBar from "./RatingBar";
import Like from "./Like";
import UploadImage from "./UploadImage";
import ShowMap from "./ShowMap";
import "../stylesheets/ShowLocation.scss";

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
      <div className="show-location">
        <div className="main-container">
          <div className="content">
            <div className="image-container">
              {location.photos && (
                <img src={location.photos[0].image} alt={location.name} />
              )}
              <div className="rating-container">
                <span>
                  Ratings: {location.ratings} (based on{" "}
                  {location.numberOfRatings} user)
                </span>
                <RatingBar
                  className="rating-bar"
                  {...this.props}
                  location_id={location.id}
                  reload={this.loadFromRails}
                />
              </div>
            </div>
            <div className="location-info">
              <h1>
                {location.name}{" "}
                {currentUser && (
                  <Like
                    {...this.props}
                    location_id={location.id}
                    reload={this.loadFromRails}
                  />
                )}
              </h1>
              <h5>{location.tagline}</h5>
              <p>{location.description}</p>
              
              {location.username === currentUser && (
                <>
                  {console.log(location.id)}
                  <div className="buttons">
                    <Button className="show-button">
                      <Link to={`/location/${location.id}/edit`}>Edit</Link>
                    </Button>
                    <Button 
                      className="show-button"
                      onClick={() => {
                        this.deleteLocation(location.id);
                        this.context.dispatch("delete", location.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  {currentUser && (
                <UploadImage
                  location_id={location.id}
                  reload={this.loadFromRails}
                />
              )}
                </>
              )}
            </div>
          </div>
          <div className="photo-grid">
            {this.state.location.photos.map((photo) => {
              return <img src={photo.image} />;
            })}
          </div>
        </div>
        <div className="sidebar">
          <ShowMap location={location} />
          <div className="comments-container">
            <Comments
              {...this.props}
              comments={this.state.comments}
              location_id={this.props.match.params.id}
            />
          </div>
        </div>
      </div>
    );
  };

  getLocation = async () => {
    console.log(this.state);
    const id = this.props.match.params.id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/locations/${id}`
    );
    const res = await response.json();
    const { location, comments } = await res;
    if (res.status >= 400) {
      this.props.history.push("/notfound");
    } else{
    this.context.dispatch("update", { ...location });
    this.setState({ location: location, comments: comments })}
  };

  loadFromRails = () => {
    this.getLocation();
  };

  render() {
    const { location, comments } = this.state;
    return (
      <>{location ? this.renderLocation(location) : this.loadFromRails()}</>
    );
  }
}

export default withRouter(ShowLocation);
