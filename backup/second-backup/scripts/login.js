let knapp = document.getElementById("login");
let paragraf = document.getElementById("paragraf");


knapp.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("username").value;
    let password = document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(user){
            window.location.href = "index.html"
        })
        .catch(function (error) {
            paragraf.innerHTML = "Error: " + error.message;
        });

});