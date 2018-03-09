//Common configs
//Using Simon's Firebase database

/*let config = {
    apiKey: "AIzaSyBbRmOv-XuKngTAir2avZf7jk1D7jxg9LU",
    authDomain: "gruppprojekt.firebaseapp.com",
    databaseURL: "https://gruppprojekt.firebaseio.com",
    projectId: "gruppprojekt",
    storageBucket: "gruppprojekt.appspot.com",
    messagingSenderId: "623943997734"
};*/

//Kadar's database
let config = {
    apiKey: "AIzaSyBFOf05SEqeqix8s3PtcbcQHB2t-GcAEHc",
    authDomain: "testproject-8ff7a.firebaseapp.com",
    databaseURL: "https://testproject-8ff7a.firebaseio.com",
    projectId: "testproject-8ff7a",
    storageBucket: "testproject-8ff7a.appspot.com",
    messagingSenderId: "484195252003"
};


firebase.initializeApp(config);
let database = firebase.database();
let auth = firebase.auth();
let defaultUserPhotoUrl = "images/icon-user.png";

