import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'components/layout/private-route';

import Login from 'containers/login';
import HomeRoutes from 'containers/home';
import AdministrativoRoutes from 'containers/administrativo';

const Routes = () => (
  <Router>
    <div className="routes-container">
      <Route exact path={"/"} component={Login} />
      <PrivateRoute exact path={"/login"} component={Login} />
      <PrivateRoute path={"/home"} component={HomeRoutes} /> 
      <PrivateRoute path={"/administrativo"} component={AdministrativoRoutes} />
    </div>
  </Router>
);

export default Routes;
