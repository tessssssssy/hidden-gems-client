import React from "react";
import Autocomplete from "react-google-autocomplete";
import { Select, Radio } from "semantic-ui-react";
import "../stylesheets/SearchBar.scss";

class SearchBar extends React.Component {
  state = {
    category: null,
    mapView: true
  };
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
  };

  toggleView = () => {
    this.setState(st => ({
      mapView: !st.mapView
    }))
  }

  render() {
    const categories = [
      { key: "art", value: "art", text: "Art" },
      { key: "photo", value: "photo", text: "Photography" },
      { key: "nature", value: "nature", text: "Nature" },
      { key: "other", value: "other", text: "Other" },
    ];
    return (
      <div className="search-bar">
        <Autocomplete
          className="autocomplete"
          onPlaceSelected={this.props.onPlaceSelected}
          types={["(regions)"]}
        />
        <div className="options">
          <Select placeholder="Category" options={categories}></Select>
          <Radio onClick={this.toggleView} className="view-toggle" toggle label={this.state.mapView ? 'list' : 'map'} />
        </div>
      </div>
    );
  }
}
export default SearchBar;
