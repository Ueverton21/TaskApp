import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyB8vCyMBlEAT1xoU_QmoWjtuNnEUKFwjqE",
    authDomain: "firetest-1df61.firebaseapp.com",
    projectId: "firetest-1df61",
    storageBucket: "firetest-1df61.appspot.com",
    messagingSenderId: "1013579810983",
    appId: "1:1013579810983:web:4e2d7d1ee137cee78ab382",
    measurementId: "G-4EXH5DS6Z1"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
export default firebase;