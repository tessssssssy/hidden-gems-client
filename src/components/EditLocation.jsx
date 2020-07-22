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
    const foundLocation = locations.find((location) => {
      return location.id === this.state.id;
    });
    this.setState({ ...foundLocation, loading: false });
  }
  
 sendFormData = async (editedLocation) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${editedLocation.id}`, {
      method: "PUT",
      body: editedLocation
    });
    const { image, location } = await response.json();
    this.context.dispatch("update", {...location, image});
    this.props.history.push("/main");
  };

  render() {
    console.log(this.state);
    console.log("hello")
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
