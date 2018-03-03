$(document).ready(function () {
    auth.onAuthStateChanged(function(user) {
        if (user) {//User is signed in.
            getUserInfo(user.uid);
        } else {
            $("#lnkSignOut").hide();
            let $message = $("<p></p>").html("NOW! <a href='signin.html'>Sign in here</a> baby!");
            $("#dspUserInfo").prepend($message);
        }
    });

    $("#lnkSignOut").click(function () {
        auth.signOut().then(function() {
            //Update node users in Firebase database

            $("#dspUserInfo").text("Sign-out successful");
        }).catch(function(error) {writeToLogs(error.code, error.message);});
    });
});
