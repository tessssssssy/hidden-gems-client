import React from "react";
import { LocationsContext, dispatch } from "../context/LocationsContext";
import { Link } from "react-router-dom";
import NewMap from "./NewMap";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk");
Geocode.enableDebug();


class MainPage extends React.Component {
  static contextType = LocationsContext;

  getLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/locations");
      const locations = await response.json();
      this.context.dispatch("populate", { locations });
    } catch (err) {
      console.log(err);
    }
  };

  filterLocations = (search) => {
    this.context.locations.filter((location) => {});
  };

  async componentDidMount() {
    await this.getLocations();
  }

  setLoading = () => this.setState({ loading: false });

  render() {
    const { locations } = this.context;
    const mapStyles = {
      position: "relative",
      top: "40px",
    };
    return (
      locations && (
        <div className="MainPage">
          {/* <Autocomplete
            google={this.props.google}
            style={{ width: "90%" }}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
            types={["(regions)"]}
          /> */}
          <NewMap
            style={mapStyles}
            google={this.props.google}
            center={{ lat: -37.815, lng: 144.96 }}
            height="500px"
            zoom={12}
            locations={locations}
          />
          <div className="locations-container">
            {locations.map((location, index) => {
              return (
                <div key={index}>
                  <Link
                    to={{
                      pathname: `/location/${location.id}`,
                      state: location,
                    }}
                    style={mapStyles}
                  >
                    {location.name}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )
    );
  }
}

export default MainPage;
