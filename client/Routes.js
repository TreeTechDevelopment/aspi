import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './src/views/Home';
import CrossR from './src/views/CrossReference';
import ServiceOrd from './src/views/ServiceOrder';


function Routes() {
    return (
        <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/CrossR">
            <CrossR />
          </Route>
          <Route exact path="/ServiceOrder">
            <ServiceOrd />
          </Route>
          
        </Switch>
    </Router>
    
    )
}

export default Routes
