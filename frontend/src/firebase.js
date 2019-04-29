import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyCMI6raNqfCwQeKgiuiqqh9pbUSkzfWI7o",
  authDomain: "ecommerceweb-7acd7.firebaseapp.com",
  databaseURL: "https://ecommerceweb-7acd7.firebaseio.com",
  projectId: "ecommerceweb-7acd7",
  storageBucket: "ecommerceweb-7acd7.appspot.com",
  messagingSenderId: "483523042990"
};
firebase.initializeApp(config);

export default firebase;