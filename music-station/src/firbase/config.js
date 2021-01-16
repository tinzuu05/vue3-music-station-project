import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAu0oGSYzQus8n9CgJuZ5B8efbCdQOgww0",
    authDomain: "vu3-music-station.firebaseapp.com",
    projectId: "vu3-music-station",
    storageBucket: "vu3-music-station.appspot.com",
    messagingSenderId: "698261233893",
    appId: "1:698261233893:web:d7931dcb7918feb0b0740c"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  // timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, timestamp }