import React from "react";

import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

import "../stylesheets/LocationsMap.scss";

// Geocode.setApiKey("AIzaSyC9Oy5FQtKMxzvAnlMiGjoaLN6GM8_klPk");
// Geocode.enableDebug();

class ShowMap extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //selectedLocation: this.props.locations[0],
//       address: "",
//       city: "",
//       area: "",
//       state: "",
//       mapPosition: {
//         lat: this.props.center.lat,
//         lng: this.props.center.lng,
//       },
//       markerPosition: {
//         lat: this.props.center.lat,
//         lng: this.props.center.lng,
//       },
//     };
//   }
  /**
   * Get the current address from the default map position and set those values in the state
   */
//   componentDidMount() {
//     Geocode.fromLatLng(
//       this.state.mapPosition.lat,
//       this.state.mapPosition.lng
//     ).then(
//       (response) => {
//         const address = response.results[0].formatted_address,
//           addressArray = response.results[0].address_components,
//           city = this.getCity(addressArray),
//           area = this.getArea(addressArray),
//           state = this.getState(addressArray);

//         console.log("city", city, area, state);

//         this.setState({
//           address: address ? address : "",
//           area: area ? area : "",
//           city: city ? city : "",
//           state: state ? state : "",
//         });
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
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
