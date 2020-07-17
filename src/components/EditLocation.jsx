import React from "react";
import LocationForm from "./LocationForm";
import { LocationsContext } from "../context/LocationsContext";

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

  onFormSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:3000/locations/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    });
    this.props.history.push("/main");
  };

  render() {
    console.log(this.state);
    return (
      !this.state.loading && (
        <>
          <LocationForm submit={this.onFormSubmit} location={this.state} />
        </>
      )
    );
  }
}

export default EditLocation;
