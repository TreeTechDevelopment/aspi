import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './src/views/Home';
import CrossR from './src/views/CrossReference';
import ServiceOrd from './src/views/ServiceOrder';
import LogInPage from './src/views/LogInPage';
import Records from './src/views/Records';
import RecordsCars from './src/views/RecordsCars';
import RecordsFilters from './src/views/RecordsFilters';
import RecordsServices from './src/views/RecordsServices';
import Provider from './src/context/Provider';


function Routes() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cross">
            <CrossR />
          </Route>
          <Route exact path="/service-order">
            <Provider> <ServiceOrd /> </Provider>
          </Route>
          <Route exact path="/iniciar-sesion">
            <LogInPage />
          </Route>
          <Route exact path="/records">
            <Records />
          </Route>
          <Route exact path="/records/cars">
            <Provider> <RecordsCars /> </Provider>
          </Route>
          <Route exact path="/records/filters">
            <Provider> <RecordsFilters /> </Provider>
          </Route>
          <Route exact path="/records/services">
            <RecordsServices />
          </Route>
        </Switch>
    </Router>
    
    )
}

export default Routes
