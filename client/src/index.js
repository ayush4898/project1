import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  firebase from 'firebase/app';
import 'firebase/storage'

  var firebaseConfig = {
    apiKey: "AIzaSyBe5ExA8ljHg8fRRdbkEtNy4zJJrSVmjS0",
    authDomain: "student-reg-4898.firebaseapp.com",
    projectId: "student-reg-4898",
    storageBucket: "student-reg-4898.appspot.com",
    messagingSenderId: "274399732612",
    appId: "1:274399732612:web:74bb77476fdeb8c934b3d1"
  };
  // Initialize Firebase  
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <App />
  ,document.getElementById('root')
); 
