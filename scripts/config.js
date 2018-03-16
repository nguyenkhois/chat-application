// Initialize Firebase
let config = {
    apiKey: "AIzaSyCLy8U4Wy0D0qYAVezelDt-TrFiueCfYng",
    authDomain: "ecchat-c34bf.firebaseapp.com",
    databaseURL: "https://ecchat-c34bf.firebaseio.com",
    projectId: "ecchat-c34bf",
    storageBucket: "ecchat-c34bf.appspot.com",
    messagingSenderId: "258738066233"
};

firebase.initializeApp(config);
let database = firebase.database();
let auth = firebase.auth();

//Default variables
//let namePattern = /^[a-zA-Z]+$/;
let namePattern = /^[a-zA-Z]+(([. -][a-zA-Z])?[a-zA-Z]*)*$/g;
let mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let defaultUserPhotoUrl = "../images/icon-user.png";
let chatPage = "index.html";
let signInPage = "login.html";