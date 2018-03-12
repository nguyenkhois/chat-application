//Created for Simon
//included in login.html
<<<<<<< HEAD

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

=======
$(document).ready(function() {
    //Get HTML elements
    //let user = auth.currentUser; //Declared but not used - K
    let knapp = document.getElementById("login");
    //let paragraf = document.getElementById("paragraf"); //Declared but not used -K

    //Functions
    //Need input validation (HTML validation and JS validation)

    //MAIN
    //Need handle errors which you receive from Firebase server and show them to the user
    auth.onAuthStateChanged(function(user){
        if (user) {
            let nodeRef = database.ref("users/" + user.uid);
            nodeRef.once("value")
                .then(function(snapshot) {
                    let objUserInfo = {
                    userId: user.uid,
                    displayName: snapshot.val().displayName,
                    phoneNumber: snapshot.val().phoneNumber,
                    photoUrl: snapshot.val().photoUrl};

                    if (typeof(Storage) !== "undefined")
                        localStorage.chatappCurrentUserInfo = JSON.stringify(objUserInfo);
                })
                .catch(function (error) {});
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
                                    //window.location.href = chatPage;
                                    $(location).attr("href",chatPage); //K added
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
>>>>>>> a51fcabd47faff597ea4f52920ed559c3ea7e0fd
});