//Created for Simon
//included in login.html

$(document).ready(function() {

auth.onAuthStateChanged(function(user){

    if (user) {
        console.log("authstatechanged IF (true)")
    }
    else {
        console.log("authstatechanged ELSE (false)")
    }

});


let knapp = document.getElementById("login");
let paragraf = document.getElementById("paragraf");
let user = auth.currentUser;

knapp.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    console.log("knapp klickad");

    auth.signInWithEmailAndPassword(email, password)
        .then(function(user){
            if (user) {

                let nodeRef = database.ref("users/" + user.uid);
                nodeRef.update({isOnline: true})
                    .then(function () {

                        //window.location.href = "index.html";
                        console.log("signin IF (true)")
                    })
            }
        })
        .catch(function (error) {
            console.log("signin catch (false)")
        });

});

});