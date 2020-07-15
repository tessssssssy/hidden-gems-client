import React from 'react';

class MainPage extends React.Component {
    // makes request to google api
    // displays locations from server
    async componentDidMount() {
        const response = await fetch('http://localhost:3000/locations');
        const locations = await response.json();
        console.log(locations)
    }
       
    render() {
        return (
            <h1>Main Page</h1>
        )
    }
}

export default MainPage;

