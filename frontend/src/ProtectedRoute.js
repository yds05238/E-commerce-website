import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
  return <Route render={(props) => (authenticated ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />)} {...rest} />;
};

export default ProtectedRoute;
