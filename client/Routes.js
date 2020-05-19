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
            <ServiceOrd />
          </Route>
          <Route exact path="/iniciar-sesion">
            <LogInPage />
          </Route>
        </Switch>
    </Router>
    
    )
}

export default Routes
