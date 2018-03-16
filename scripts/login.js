$(document).ready(function() {
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

            $("#login").on("click", function(event) {
                $("#loginerrormessage").text("Looks like you are already logged in, please logout first");
                $("#loginerrormessage").css("color", "red");
                $("#pass").css("margin-bottom", "1px");
            });
        }
        else {
            $("#login").on("click", function(event) {
                event.preventDefault();
                let email = $('#email').val();
                let password = $('#pass').val();


                auth.signInWithEmailAndPassword(email, password)
                    .then(function(user){
                        if (user) {
                            let nodeRef = database.ref("users/" + user.uid);
                            nodeRef.update({isOnline: true})
                                .then(function () {
                                    $(location).attr("href",chatPage); //K added
                                })
                        }
                    })
                    .catch(function (error) {
                        console.log("signin catch (false)");

                        $("#loginerrormessage").text("Email or password is wrong!");
                        $("#loginerrormessage").css("color", "red");
                        $("#pass").css("margin-bottom", "1px");

                    });
            });
            console.log("authstatechanged FALSE");
        }
    });
});