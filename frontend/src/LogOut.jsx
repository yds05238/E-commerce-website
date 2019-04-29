import React from 'react';
import firebase from 'firebase';
//import Button from '@material-ui/core/Button';
//import { Redirect } from 'react-router-dom';
//import * as ROUTES from './constants/routes';

const logOutUser = () => {
  firebase.auth().signOut();
  //return <Redirect to={ROUTES.LOGIN} />;
};

const LogOut = () => {
  return <button onClick={logOutUser} children="Log Out" />;
};

export default LogOut;
