import React from "react";

import {
  withGoogleMap,
  GoogleApiWrapper,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";

import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../stylesheets/LocationsMap.scss";

import photography from './camera.png';
import art from './art.png';
import architecture from './architecture.png';
import nature from './nature.png';
import other from './other.png';

// Geocode.setApiKey("AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk");
// Geocode.enableDebug();

class LocationsMap extends React.Component {
  static defaultProps = {
    icons: {
      photography: photography,
      art: art,
      architecture: architecture,
      nature: nature,
      other: other
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      //selectedLocation: this.props.locations[0],
      address: "",
      city: "",
      area: "",
      state: "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        console.log("city", city, area, state);

        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    console.log("plc", place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    sessionStorage.setItem("latitude", latValue);
    sessionStorage.setItem("longitude", lngValue);
    this.props.filterLocations();
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
    console.log(sessionStorage);
  };

  showInfoWindow = (location) => {
    this.setState({ selectedLocation: location });
    console.log(this.state.selectedLocation.id);
    console.log(this.props.locations)
  };

  getIcon(category) {
    const { art, photography, architecture, nature, other } = this.props.icons
    if (category === "art") {
      return art
    } else if (category === "Photography") {
      return photography
    } else if (category === "Architecture") {
      return architecture
    } else if (category === "Nature") {
      return nature 
    } else {
      return other
    }
  }
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng
          }}
        >
          {this.props.locations.map((location, index) => {
            console.log(location.category)
            return (
              <>
                <Marker
                  icon={{
                    url: this.getIcon(location.category),
                    }}
                  onClick={() => this.showInfoWindow(location)}
                  google={this.props.google}
                  position={{
                    lat: location.latitude,
                    lng: location.longitude,
                  }}
                />
                {this.state.selectedLocation && location.id === this.state.selectedLocation.id && (
                  <InfoWindow
                    className="info-window" // {location.id === this.state.selectedLocation ? "info-window-selected" : "info-window"}
                    position={{
                      lat: location.latitude + 0.0018,
                      lng: location.longitude,
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/location/${location.id}`,
                        state: location,
                      }}
                      key={index}
                      style={{ padding: 0, margin: 0 }}
                    >
                      {location.name}
                    </Link>
                  </InfoWindow>
                )}
              </>
            );
          })}
          <SearchBar
            filterLocations={this.props.filterLocations}
            place={this.state.place}
            onPlaceSelected={this.onPlaceSelected}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div className="map-container">
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: "100%", width: "100%" }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk",
// })(LocationsMap);

export default LocationsMap;
