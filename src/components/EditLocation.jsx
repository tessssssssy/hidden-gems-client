import React from 'react';
import LocationForm from './LocationForm'

class EditLocation extends React.Component {
    render() {
        return (
            <LocationForm submit={this.onFormSubmit}/>
        )
    }
}

export default EditLocation;
