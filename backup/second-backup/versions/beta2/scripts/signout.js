$(document).ready(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            //Update the user state in Firebase database
            let nodeRef = database.ref("users/" + user.uid);
            nodeRef.update({isOnline: false})
                .then(function () {
                    //Begin sign out process
                    auth.signOut()
                        .then(function () {
                            $("#dspUserInfo").text("Sign-out successful");
                            removeLocalStoredData();//Remove channelId in sessionStorage
                            goToSignIn();
                        })
                        .catch(function (error) {writeToLogs(error.code, error.message);});
                })
                .catch(function (error) {writeToLogs(error.code, error.message);});
        }
    });
});