//Created for Simon
//included in login.html

$(document).ready(function() {
    //Get HTML elements
    let user = auth.currentUser;
    let knapp = document.getElementById("login");
    let paragraf = document.getElementById("paragraf");

    //Functions


    //MAIN

    auth.onAuthStateChanged(function(user){
        if (user) {
            console.log("authstatechanged TRUE");
        }
        else {

            knapp.addEventListener("click", function(event) {
                event.preventDefault();
                let email = document.getElementById("email").value;
                let password = document.getElementById("pass").value;

                auth.signInWithEmailAndPassword(email, password)
                    .then(function(user){
                        if (user) {

                            let nodeRef = database.ref("users/" + user.uid);
                            nodeRef.update({isOnline: true})
                                .then(function () {

                                    //window.location.href = "index.html";
                                    console.log("success, you signed in")
                                })
                        }
                    })
                    .catch(function (error) {
                        console.log("signin catch (false)")
                    });

            });
            console.log("authstatechanged FALSE");
        }

    });
});