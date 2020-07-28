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
import RecordsProduts from './src/views/RecordsProducts';
import RecordsServices from './src/views/RecordsServices';
import Orders from './src/views/Orders';
import SignUp from './src/views/SignUp';
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
          <Route exact path="/orders">
            <Provider> <Orders /> </Provider>
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
          <Route exact path="/records/products">
            <Provider> <RecordsProduts /> </Provider>
          </Route>
          <Route exact path="/records/services">
            <RecordsServices />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
        </Switch>
    </Router>
    
    )
}

export default Routes
