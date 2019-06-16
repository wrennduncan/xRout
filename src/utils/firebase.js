import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBWMVdpmq5wApsVka3A87ua8NiKv-u0Tug",
    authDomain: "red-x-cb7fe.firebaseapp.com",
    databaseURL: "https://red-x-cb7fe.firebaseio.com",
    projectId: "red-x-cb7fe",
    storageBucket: "red-x-cb7fe.appspot.com",
    messagingSenderId: "360445695191",
    appId: "1:360445695191:web:6389b48da26b7a68"
  };

    // Initialize Firebase
//export default firebase.initializeApp(firebaseConfig);
export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();