import React from 'react';
import LocationForm from './LocationForm';

class CreateLocation extends React.Component {
    render() {
        return (
            <LocationForm submit={this.onFormSubmit}/>
        )
    }
}

export default CreateLocation;
