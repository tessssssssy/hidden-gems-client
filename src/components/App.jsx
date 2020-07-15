import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from './Landing';
import MainPage from './MainPage';
import CreateLocation from './CreateLocation';
import EditLocation from './EditLocation';
import ShowLocation from './ShowLocation';
import Navbar from './Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/main" component={MainPage} />
        <Route exact path="/location/create" component={CreateLocation} />
        <Route exact path="/location/:id" component={ShowLocation} />
        <Route exact path="/location/:id/edit" component={EditLocation} />
      </Switch>
    </>
 )
}

export default App;
