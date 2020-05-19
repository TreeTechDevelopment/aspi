import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Home from './src/views/Home';
import CrossR from './src/views/CrossReference';
import ServiceOrd from './src/views/ServiceOrder';
<<<<<<< HEAD
import LogInPage from './src/views/LogInPage';
=======

>>>>>>> 5260ab9b46d81e58c3fba9328276a3f7e085ed70

function Routes() {
    return (
        <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
<<<<<<< HEAD
          <Route exact path="/cross">
            <CrossR />
          </Route>
          <Route exact path="/service-order">
            <ServiceOrd />
          </Route>
          <Route exact path="/iniciar-sesion">
            <LogInPage />
          </Route>
=======
          <Route exact path="/CrossR">
            <CrossR />
          </Route>
          <Route exact path="/ServiceOrder">
            <ServiceOrd />
          </Route>
          
>>>>>>> 5260ab9b46d81e58c3fba9328276a3f7e085ed70
        </Switch>
    </Router>
    
    )
}

export default Routes
