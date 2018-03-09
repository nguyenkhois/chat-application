let message = document.getElementById("message");
let button = document.getElementById("submit");
let output = document.getElementById("messageOutput");

let currentDate = new Date();

currentDate.getFullYear();
currentDate.getMonth();
currentDate.getDay();
currentDate.getHours();
currentDate.getMinutes();
currentDate.getSeconds();

button.addEventListener('click', function() {
    database.ref('/messages').push({
        message: message.value,
        timeStamp: currentDate.toString()
    });
    console.log(currentDate);
    output.innerHTML = "";
    message.value = "";
});



// DATABAS
// DATABAS

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

// DATABAS
// DATABAS