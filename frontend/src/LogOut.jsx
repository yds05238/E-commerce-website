import React from 'react';
import firebase from 'firebase';
//import Button from '@material-ui/core/Button';


const logOutUser = () => {
  firebase.auth().signOut();
};

const LogOut = () => {
  return <button onClick={logOutUser} children="Log Out" />;
};

export default LogOut;
