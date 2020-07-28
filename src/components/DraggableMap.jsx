import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import { GoogleApiWrapper } from "google-maps-react";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { GoogleMapsAPI } from "../client-config";
import LocationForm from "./LocationForm";
import SearchBar from "./SearchBar";
import "../stylesheets/DraggableMap.scss";

Geocode.setApiKey("AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk");
Geocode.enableDebug();

class DraggableMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      infoWindow: true,
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
  prefillForm = () => {
    if (this.props.location) {
      this.setState({
        name: this.props.location.name,
        tagline: this.props.location.tagline,
        description: this.props.location.description,
      });
    }
  };
  componentDidMount() {
    console.log("component did mount");
    this.prefillForm();
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
      this.state.state !== nextState.state ||
      this.state.name !== nextState.name ||
      this.state.tagline !== nextState.tagline ||
      this.state.description !== nextState.description
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
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0],
      });
    } else {
      this.setState({
        [key]: event.target.value,
      });
    }
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {
    this.setState({infoWindow: false})
  };

  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          infoWindow: false,
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

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
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      address: this.state.address,
      name: this.state.name,
      tagline: this.state.tagline,
      description: this.state.description,
      image: this.state.image,
      latitude: this.state.markerPosition.lat,
      longitude: this.state.markerPosition.lng,
    };
    const data = new FormData();
    for (let key in formData) {
      data.append(`location[${key}]`, formData[key]);
    }
    this.props.sendFormData(data);
  };

  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* InfoWindow on top of marker */}
          { this.state.infoWindow &&
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {"Drag pin to location"}
              </span>
            </div>
          </InfoWindow> }
          {/*Marker*/}
          <Marker
            google={this.props.google}
            // name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
          {/* For Auto complete Search Box */}
          <div className="search-bar">
          <Autocomplete
          className="autocomplete"
            // style={{
            //   width: "100%",
            //   height: "40px",
            //   paddingLeft: "16px",
            //   marginTop: "2px",
            //   marginBottom: "500px",
            //   position: "relative",
            //   bottom: "100vh"
            // }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
          </div>
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div className="draggable-map">
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: "90vh", width: "100%", position: "relative", top: "10vh" }} />
            }
            mapElement={<div className="google-map" style={{ height: `100%`, position: "relative" }} />}
          />
          <div className="form-container">
            {this.props.location ? <h1>Edit {this.props.location.name}</h1> : <h1>Add New Location</h1>}
          <Form
            className="location-form"
            onSubmit={this.onFormSubmit}
            encType="multipart/form-data"
          >
            <Form.Field >
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                className="form-control read-only"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.address}
              />
            </Form.Field>
            <Form.Field className="hidden">
              <label htmlFor="">Latitude</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.markerPosition.lat}
              />
            </Form.Field>
            <Form.Field className="hidden">
              <label htmlFor="">Longitude</label>
              <input
                type="text"
                name="address"
                className="form-control"
                onChange={this.onChange}
                readOnly="readOnly"
                value={this.state.markerPosition.lng}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Name</label>
              <input
                onChange={this.onChange}
                value={this.state.name}
                id="name"
                name="name"
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="tagline">Tagline</label>
              <input
                onChange={this.onChange}
                value={this.state.tagline}
                id="tagline"
                name="tagline"
                placeholder="Tagline"
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="description">Description</label>
              <textarea
                onChange={this.onChange}
                value={this.state.description}
                name="description"
                id="description"
                rows={5}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={this.onChange}
              />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
          </div>
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
// })(DraggableMap);

export default DraggableMap;
