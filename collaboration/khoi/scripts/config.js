//Common configs
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
let defaultUserPhotoUrl = "images/icon-user.png";
let namePattern = /^[a-zA-Z-]+$/;
let mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let chatPage = "../../index.html";
let signInPage = "signin.html";

