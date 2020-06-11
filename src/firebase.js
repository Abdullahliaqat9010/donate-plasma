import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCmDtmrN8xomsSZGfgsLVv_RKAKBsFFnXM",
    authDomain: "donate-plasma.firebaseapp.com",
    databaseURL: "https://donate-plasma.firebaseio.com",
    projectId: "donate-plasma",
    storageBucket: "donate-plasma.appspot.com",
    messagingSenderId: "429839917974",
    appId: "1:429839917974:web:a4a6956f9e2a485d8f73b7",
    measurementId: "G-69DR22T208"
  };


if(firebase.apps.length < 1){
    firebase.initializeApp(firebaseConfig)
}

export default firebase