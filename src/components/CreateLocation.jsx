import React from 'react';
import LocationForm from './LocationForm';
import { LocationsContext } from "../context/LocationsContext";
import DraggableMap from './DraggableMap';

class CreateLocation extends React.Component {
    static contextType = LocationsContext;
    //create location
    sendFormData = async (newLocation) => {
        // await this.context.dispatch("add", newLocation);
        // debugger
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`, {
          method: "POST",
          body: newLocation
        });
        const { image, location } = await response.json();
        this.context.dispatch("add", {...location, image});
        this.props.history.push("/main");
    };

    render() {
        return (
          <>
            <DraggableMap
            google={this.props.google}
            center={{lat: -37.815, lng: 144.96}}
            height='300px'
            zoom={12}
            sendFormData={this.sendFormData}
            />
            {/* <LocationForm onFormHandler={this.onFormHandler}/> */}
          </>
        )
    }
}

export default CreateLocation;
