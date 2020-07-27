import React from "react";
import LocationForm from "./LocationForm";
import { LocationsContext } from "../context/LocationsContext";
import DraggableMap from './DraggableMap';

// ${process.env.REACT_APP_BACKEND_URL}
class EditLocation extends React.Component {
  static contextType = LocationsContext;
  state = {
    loading: true,
    id: Number(this.props.match.params.id),
  };

  async componentDidMount() {
    console.log("componentDidMount");
    const locations = await this.context.locations;
    console.log(locations)
    const foundLocation = locations.find((location) => {
      return location.id === this.state.id;
    });
    this.setState({ ...foundLocation, loading: false });
  }
  
 sendFormData = async (editedLocation) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${this.state.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: editedLocation
    });
    const { location } = await response.json();
    this.context.dispatch("update", {...location});
    this.props.history.push(`/location/${location.id}`);
  };

  render() {
    console.log(this.state);
    return (
      !this.state.loading && (
        <>
        <DraggableMap
            google={this.props.google}
            center={{lat: this.state.latitude, lng: this.state.longitude}}
            height='300px'
            zoom={12}
            sendFormData={this.sendFormData}
            location={this.state}
            />
          {/* <LocationForm location={this.state} onFormHandler={this.onFormHandler} /> */}
        </>
      )
    );
  }
}

export default EditLocation;


