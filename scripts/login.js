$(document).ready(function() {
    //Get HTML elements
    let knapp = document.getElementById("login");
    let mailformat = /^([A-Za-z0-9_.\-]){1,200}@([A-Za-z0-9_.\-]){1,200}\.([A-Za-z]){2,6}$/;


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
                        console.log("signin catch (false)");

                        if (mailformat.test($("#email").val()) == false) {
                            alert("Email format is wrong");
                            return false;
                        }
                        else {
                            alert("Email or Password is wrong");
                            return false;
                        }

                    });
            });
            console.log("authstatechanged FALSE");
        }
    });
});