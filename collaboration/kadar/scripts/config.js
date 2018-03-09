//Common configs
//Using Simon's Firebase database

let config = {
    apiKey: "AIzaSyBbRmOv-XuKngTAir2avZf7jk1D7jxg9LU",
    authDomain: "gruppprojekt.firebaseapp.com",
    databaseURL: "https://gruppprojekt.firebaseio.com",
    projectId: "gruppprojekt",
    storageBucket: "gruppprojekt.appspot.com",
    messagingSenderId: "623943997734"
};
firebase.initializeApp(config);
let database = firebase.database();
let auth = firebase.auth();
let defaultUserPhotoUrl = "images/icon-user.png";

