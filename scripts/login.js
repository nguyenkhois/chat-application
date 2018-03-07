let config = {
    apiKey: "AIzaSyBbRmOv-XuKngTAir2avZf7jk1D7jxg9LU",
    authDomain: "gruppprojekt.firebaseapp.com",
    databaseURL: "https://gruppprojekt.firebaseio.com",
    projectId: "gruppprojekt",
    storageBucket: "gruppprojekt.appspot.com",
    messagingSenderId: "623943997734"
};
firebase.initializeApp(config);

let knapp = document.getElementById("login");
let paragraf = document.getElementById("paragraf");


knapp.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("emaillogin").value;
    let password = document.getElementById("passwordlogin").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(loginuser){
            console.log("Success, you logged in, welcome ", loginuser.uid);

        })
        .catch(function (error) {
            paragraf.innerHTML(error.code, "fnSignIn: "+error.message);
        });

});