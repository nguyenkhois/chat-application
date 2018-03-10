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
            let nodeRef = database.ref("users/" + user.uid);
            nodeRef.once("value")
                .then(function(snapshot) {

                    let objUserInfo = {
                    userId: user.uid,
                    displayName: snapshot.val().displayName,
                    phoneNumber: snapshot.val().phoneNumber,
                    photoUrl: snapshot.val().photoUrl
                    };


                    if (typeof(Storage) !== "undefined")
                        localStorage.chatappCurrentUserInfo = JSON.stringify(objUserInfo);

                })
                .catch();
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

                                    window.location.href = "chat.html";
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