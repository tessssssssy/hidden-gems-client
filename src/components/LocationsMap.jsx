import React from "react";

import {
  withGoogleMap,
  GoogleApiWrapper,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow,
} from "react-google-maps";

import Geocode from "react-geocode";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../stylesheets/LocationsMap.scss";

import photography from "../images/camera.png";
import art from "../images/art.png";
import architecture from "../images/architecture.png";
import nature from "../images/nature.png";
import other from "../images/other.png";

class LocationsMap extends React.Component {
  static defaultProps = {
    icons: {
      photography: photography,
      art: art,
      architecture: architecture,
      nature: nature,
      other: other,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
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

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onPlaceSelected = (place) => {
    console.log("plc", place);
    let address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    city = place.formatted_address.split(' ')[0];
    sessionStorage.setItem("latitude", latValue);
    sessionStorage.setItem("longitude", lngValue);
    sessionStorage.setItem("city", city);
    console.log(sessionStorage);
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
  };

  showInfoWindow = (location) => {
    this.setState({ selectedLocation: location });
    console.log(this.state.selectedLocation.id);
    console.log(this.props.locations);
  };

  getIcon(category) {
    const { art, photography, architecture, nature, other } = this.props.icons;
    if (category === "art") {
      return art;
    } else if (category === "Photography") {
      return photography;
    } else if (category === "Architecture") {
      return architecture;
    } else if (category === "Nature") {
      return nature;
    } else {
      return other;
    }
  }
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <>
        <SearchBar
              filterLocations={this.props.filterLocations}
              place={this.state.place}
              onPlaceSelected={this.onPlaceSelected}
            />
          <GoogleMap
            google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{
              lat: this.state.mapPosition.lat,
              lng: this.state.mapPosition.lng,
            }}
          >
            {this.props.locations.map((location, index) => {
              console.log(location.category);
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
                  {this.state.selectedLocation &&
                    location.id === this.state.selectedLocation.id && (
                      <InfoWindow
                        className="info-window"
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
          </GoogleMap>
        </>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div className="map-container">
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: "80%",
                  width: "100%",
                  position: "relative",
                  top: "90px",
                }}
              />
            }
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

export default LocationsMap;
