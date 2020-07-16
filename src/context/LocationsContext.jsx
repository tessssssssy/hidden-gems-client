import React from 'react'

function dispatch(action, value) {
  switch(action) {
    case "populate":
      this.setState( { locations: value.locations } )
      break;
    case "add":
      this.setState((state) => {
        return { locations: [...state.locations, value] }
      })
      break;
    case "delete": 
      this.setState((state) => {
        const locations = state.locations.filter((location) => {
          return location.id !== value
        })
        return {
          locations: locations
        }
      })
      break;
    case "update": 
      this.setState((state) => {
        const locations = state.locations.map((location) => {
          if (value.id === location.id) {
            return value
          } else {
            console.log('NoMatch')
            return location
          }
        })
        return {
          locations: locations
        }
      })
      break;
    case "logout": 
      this.setState({ currentUser: false })
      break;
    case "current user":
      this.setState({ currentUser: value })
      break;
    default: 
      console.log("in locations")
  }
}

const LocationsContext = React.createContext({
  locations: [],
  dispatch: () => {},
  currentUser: false
})

export {
  LocationsContext,
  dispatch
}

