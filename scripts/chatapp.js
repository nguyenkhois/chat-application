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
        //Update node users in Firebase database
        let user = auth.currentUser;
        if (user){
            //User is signed in.
            let nodeRef = database.ref("users/" + user.uid);
            nodeRef.update({isOnline: false})
                .then(function () {
                    //Begin sign out process
                    auth.signOut().then(function() {$("#dspUserInfo").text("Sign-out successful");})
                                  .catch(function(error) {writeToLogs(error.code, error.message);});
                })
                .catch(function(error) {writeToLogs(error.code, error.message);});
        }
    });
});
