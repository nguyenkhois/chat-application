$(document).ready(function () {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            //User is signed in.
            getUserInfo(user.uid);
        } else {
            // No user is signed in.
            $("#lnkSignOut").hide();
            goToSignIn();
        }
    });
});
