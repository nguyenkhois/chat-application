let config = {
    apiKey: "AIzaSyBcG4q6O9Xo6uFL6UaA25cHU5AIJfOT1w4",
    authDomain: "chattapp-b40df.firebaseapp.com",
    databaseURL: "https://chattapp-b40df.firebaseio.com",
    projectId: "chattapp-b40df",
    storageBucket: "chattapp-b40df.appspot.com",
    messagingSenderId: "957415389331"
};
firebase.initializeApp(config);
let database = firebase.database();
let auth = firebase.auth();