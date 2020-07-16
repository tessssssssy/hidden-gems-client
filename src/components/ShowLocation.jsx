import React from 'react';

class ShowLocation extends React.Component {
    render() {
        const location = this.props.location.state;
        console.log(location)
        return (
            <h1>Location Show Page</h1>
        )
    }
}

export default ShowLocation;