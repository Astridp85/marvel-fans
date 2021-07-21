import firebase from "firebase/app";
import "firebase/firebase-firestore";

// // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCl-bmvgNYwthmSfjUSxcMqfaVDcPwlNBg",
    authDomain: "marvel-fans-7eb6f.firebaseapp.com",
    projectId: "marvel-fans-7eb6f",
    storageBucket: "marvel-fans-7eb6f.appspot.com",
    messagingSenderId: "1032559737144",
    appId: "1:1032559737144:web:addf2322d60c739cb5e9cd",
    measurementId: "G-HPSR9M7N5H"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();
