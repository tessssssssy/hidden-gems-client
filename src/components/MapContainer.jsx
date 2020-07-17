import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  fetchPlaces(mapProps, map) {
    const { google } = mapProps;
    new google.maps.places.PlacesService(map);
    // ...
  }
  render() {
    const style = {
      width: "900px",
      height: "500px",
      position: 'relative',
      marginLeft: "20px",
      borderRadius: "10px",
    };
    return (
      <div style={style}>
        <Map
          google={this.props.google}
          zoom={2}
          style={style}
          initialCenter={{
            lat: 20,
            lng: 20,
          }}
        >
          {this.props.countries.map((country, index) => {
            return (
              <Marker
                onClick={this.onMarkerClick}
                name={country.name}
                key={index}
                position={{ lat: country.latlng[0], lng: country.latlng[1] }}
              />
            );
          })}
          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGkaCV8ZOzOSIQrIIUU72u8Ke7pP_BIuE",
})(MapContainer);

