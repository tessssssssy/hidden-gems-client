import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/countries" component={CountriesList} />
        <ProtectedRoute exact path="/countries/create" component={CreateCountry} />
        <Route exact path="/countries/:name" component={Country}/>
        <Route exact path="/login" render={(props) => <Login {...props} setLoggedIn={setLoggedIn}/> } />
        <Route exact path="/sign-up" render={(props)=> <SignUp {...props} setLoggedIn={setLoggedIn}/>} />    
      </Switch>
  );
}

export default App;
