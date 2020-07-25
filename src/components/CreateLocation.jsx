import React from 'react';
import LocationForm from './LocationForm';
import { LocationsContext } from "../context/LocationsContext";
import DraggableMap from './DraggableMap';

class CreateLocation extends React.Component {
    static contextType = LocationsContext;
    sendFormData = async (newLocation) => {
      console.log(newLocation)
        // await this.context.dispatch("add", newLocation);
        // debugger
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: newLocation
        });
        const { image, location } = await response.json();
        // const location = await response.json();
        this.context.dispatch("add", {...location, image});
        // this.context.dispatch("add", location);
        this.props.history.push("/main");
    };

    // createPhoto = async (image) => {
    //   const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/locations/${id}/photos`, {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`
    //     }, b
    //   });
    // }

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
