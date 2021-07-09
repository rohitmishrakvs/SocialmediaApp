import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyDvO8zmvD7nTwPCo3ESdK9x-UOK0vHnuA8",
    authDomain: "webshare-c9460.firebaseapp.com",
    projectId: "webshare-c9460",
    storageBucket: "webshare-c9460.appspot.com",
    messagingSenderId: "1015662342372",
    appId: "1:1015662342372:web:83006219b88b06e06efcf1",
    measurementId: "G-ZN1M10VHCB",
    databaseURL:"https://webshare-c9460-default-rtdb.firebaseio.com"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // console.log(firebaseConfig.firestore());
  export default firebase;