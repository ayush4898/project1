import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  firebase from 'firebase/app';
import 'firebase/storage';

//console.log(process.env);
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "student-reg-4898.firebaseapp.com",
    projectId: "student-reg-4898",
    storageBucket: "student-reg-4898.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
  };
  // Initialize Firebase  
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />
  ,document.getElementById('root')
); 
