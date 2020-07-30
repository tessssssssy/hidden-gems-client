import React from "react";
import { Link, Redirect } from "react-router-dom";
import { LocationsContext } from "../context/LocationsContext";
import { Button, Image, Modal } from "semantic-ui-react";
import Popup from "reactjs-popup";
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
                </>
              )}
              {currentUser && (
                <UploadImage
                  location_id={location.id}
                  reload={this.loadFromRails}
                />
              )}
            </div>
          </div>
          <div className="photo-grid">
            {this.state.location.photos.map((photo) => {

              return (
                <Popup
                  trigger={<img src={photo.image}/>}
                  modal
                  closeOnDocumentClick
                >
                  <span className="popup">
                    <img className="popup-image" src={photo.image}/>
                    <p>Posted by {photo.username ? photo.username : "anonymous"}</p>
                    </span>
                </Popup>
              );
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

  checkStatus = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      this.props.history.push("/notfound");
    }
  };

  getLocation = async () => {
    try {
      const id = this.props.match.params.id;
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/locations/${id}`
      );
      const res = await this.checkStatus(response);
      const { location, comments } = res;
      this.context.dispatch("update", { ...location });
      this.setState({ location: location, comments: comments });
    } catch (err) {
      console.log(err);
    }
  };

  loadFromRails = () => {
    this.getLocation();
  };

  render() {
    console.log("render");
    const { location, comments } = this.state;
    return (
      <>{location ? this.renderLocation(location) : this.loadFromRails()}</>
    );
  }
}

export default ShowLocation;
