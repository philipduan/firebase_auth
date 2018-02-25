import * as firebase from 'firebase';

//Initialise Firebase
const config = {
  apiKey: "AIzaSyA78p6MDO90sbSmmliBja10XSSBnOVuZHM",
  authDomain: "fir-auth-fc519.firebaseapp.com",
  databaseURL: "https://fir-auth-fc519.firebaseio.com",
  projectId: "fir-auth-fc519",
  storageBucket: "fir-auth-fc519.appspot.com",
  messagingSenderId: "408870491462"
};
firebase.initializeApp(config);

export default firebase;