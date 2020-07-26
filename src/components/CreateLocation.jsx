import React from 'react';
import LocationForm from './LocationForm';
import { LocationsContext } from "../context/LocationsContext";
import DraggableMap from './DraggableMap';

class CreateLocation extends React.Component {
    static contextType = LocationsContext;
    sendFormData = async (newLocation) => {
        // await this.context.dispatch("add", newLocation);
        // debugger
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: newLocation
        });
        const { location, errors } = await response.json();
        if(errors!=null){throw errors}
        console.log(location)
        this.context.dispatch("add", { ...location });
        this.props.history.push(`/location/${location.id}`);
      }
      catch(err) {alert(err)}
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
