import React from "react";
import { Autocomplete, GoogleApiWrapper } from "react-google-autocomplete";
import { Redirect } from "react-router-dom";
import Script from "react-load-script";
import LandingSearch from "./LandingSearch";
import "../stylesheets/Landing.scss";
import icon from "../images/gem_icon_color.png";

class Landing extends React.Component {
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
    console.log(this.state)
      sessionStorage.setItem("latitude", this.state.markerPosition.lat) 
      sessionStorage.setItem("longitude", this.state.markerPosition.lng) 
      this.props.history.push("/main");
  };

  render() {
    return (
      <div className="landing">
        <h1><img style={{width: "100px"}} src={icon}/>Hidden Gems</h1>
        <h3>Find your next adventure</h3>
        <LandingSearch onPlaceSelected={this.onPlaceSelected} />
      </div>
    );
  }
}

export default Landing;
