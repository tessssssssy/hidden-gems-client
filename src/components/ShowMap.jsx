import React from "react";

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";

import "../stylesheets/LocationsMap.scss";

class ShowMap extends React.Component {
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={12}
          defaultCenter={{
            lat: this.props.location.latitude,
            lng: this.props.location.longitude,
          }}
        >
          <Marker
            google={this.props.google}
            position={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude,
            }}
          />
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.location.latitude !== undefined) {
      map = (
        <div className="show-map-container">
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: "100%", width: "100%" }} />}
            mapElement={<div style={{ height: `300px`, width: "100%" }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}

export default ShowMap;
