import React from 'react';
import LocationForm from './LocationForm';
import { LocationsContext } from "../context/LocationsContext";

class CreateLocation extends React.Component {
    static contextType = LocationsContext;
    onFormHandler = async (newLocation) => {
        await this.context.dispatch("add", newLocation);
        await fetch(`http://localhost:3000/locations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLocation),
        });
        this.props.history.push("/main");
      };
    render() {
        return (
            <LocationForm onFormHandler={this.onFormHandler}/>
        )
    }
}

export default CreateLocation;
