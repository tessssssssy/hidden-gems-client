import React from "react";
import { LocationsContext, dispatch } from "../context/LocationsContext";
import { Link } from "react-router-dom";
import LocationsMap from "./LocationsMap";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import SearchBar from "./SearchBar";
import "../stylesheets/MainPage.scss";

class MainPage extends React.Component {
  static contextType = LocationsContext;

  getLocations = async () => {
    const coordinates = {
      latitude: sessionStorage.getItem("latitude") || -37.814,
      longitude: sessionStorage.getItem("longitude") || 144.96332,
    };
    console.log(coordinates);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/locations?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
      const { locations }= await response.json();
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

  render() {
    const { locations } = this.context;
    return (
      locations && (
        <div className="main-page">
          <LocationsMap
            className="map"
            filterLocations={this.getLocations}
            google={this.props.google}
            center={{ lat: -37.814, lng: 144.96332 }}
            height="500px"
            zoom={12}
            locations={locations}
          />
          <div className="locations-container">
            <div className="locations-header"></div>
            {locations &&
              locations.map((location, index) => {
                return (
                  <Link
                    className="location"
                    to={{
                      pathname: `/location/${location.id}`,
                      state: location,
                    }}
                    key={index}
                  >
                    <img src={location.photos[0].image} />
                    {/* <Link
                    to={{
                      pathname: `/location/${location.id}`,
                      state: location,
                    }}
                  >
                    {location.name}
                  </Link> */}
                    <p>Ratings; {location.ratings}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      )
    );
  }
}

export default MainPage;
