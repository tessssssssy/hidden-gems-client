import React from "react";
import { LocationsContext, dispatch } from "../context/LocationsContext";
import { Link } from "react-router-dom";
import LocationsMap from "./LocationsMap";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import SearchBar from "./SearchBar";
import "../stylesheets/MainPage.scss";
import { Checkbox, Rating } from "semantic-ui-react";

class MainPage extends React.Component {
  static contextType = LocationsContext;
  state = { toggled: false };

  getLocations = async () => {
    const coordinates = {
      latitude: sessionStorage.getItem("latitude") || -37.814,
      longitude: sessionStorage.getItem("longitude") || 144.96332,
    };
    console.log(coordinates);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/locations?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`
      );
      const { locations } = await response.json();
      console.log(locations);
      this.context.dispatch("populate", { locations });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await this.getLocations();
  }

  setLoading = () => this.setState({ loading: false });

  onToggle = (e) => {
    console.log("toggled");
    if (e.target.checked) {
      this.setState({ toggled: true });
    } else {
      this.setState({ toggled: false });
    }
  };

  render() {
    const latitude = Number(sessionStorage.getItem("latitude")) || -37.814
    const longitude =  Number(sessionStorage.getItem("longitude")) || 144.96332
    let locations = this.context.locations;
    const likes = sessionStorage.getItem("likes");
    if (this.state.toggled && likes && locations) {
      const savedLocation = locations.filter((location) => {
        return JSON.parse(likes).includes(location.id);
      });
      locations = savedLocation;
    }
    const positionFixed = { position: "fixed" };
    return (
      locations && (
        <div className="main-page">
          <LocationsMap
            className="map"
            filterLocations={this.getLocations}
            google={this.props.google}
            center={{ lat: latitude, lng: longitude }}
            height="500px"
            zoom={12}
            locations={locations}
          />
          <div className="locations-container">
            <div
              className="locations-header"
              style={locations.length >= 4 ? positionFixed : null}
            >
              {sessionStorage.getItem("currentUser") && (
                <div class="ui toggle checkbox">
                  <input type="checkbox" onClick={this.onToggle}></input>
                  <label>Show Saved Locations</label>
                </div>
              )}
            </div>
            <div class="location-main">
              {locations &&
                locations.map((location, index) => {
                  return (
                    <div className="location">
                      <div className="location-heading">
                        <Link
                          to={{
                            pathname: `/location/${location.id}`,
                            state: location,
                          }}
                          key={index}
                        >
                          {location.name}
                        </Link>
                        <Rating maxRating={5} icon="star" disabled={true} rating={location.ratings} />
                      </div>
                      <div className="location-content">
                        <div className="image-container">
                          <img src={location.photos[0].image} />
                        </div>
                        <p>{location.description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )
    );
  }
}

export default MainPage;
