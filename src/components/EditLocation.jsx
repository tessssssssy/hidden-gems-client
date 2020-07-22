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

 editLocation = async (editedLocation) => {
    await this.context.dispatch("update", editedLocation);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${editedLocation.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedLocation),
    });
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
            center={{lat: -37.815, lng: 144.96}}
            height='300px'
            zoom={12}
            createLocation={this.editLocation}
            />
          {/* <LocationForm location={this.state} onFormHandler={this.onFormHandler} /> */}
        </>
      )
    );
  }
}

export default EditLocation;
