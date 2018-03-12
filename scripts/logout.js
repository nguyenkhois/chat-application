

$(document).ready(function() {

    auth.onAuthStateChanged(function(user){
    if (user) {
        console.log("authstatechanged TRUE");
        let nodeRef = database.ref("users/" + user.uid);
        nodeRef.update({isOnline: false});

        firebase.auth().signOut().then(function() {
            console.log("signout successful");

            localStorage.clear();
            localStorage.removeItem("firebase:host:chattapp-b40df.firebaseapp.com");
            localStorage.removeItem("chatappCurrentUserInfo");
            localStorage.removeItem("chatappChannelId");



            $(location).attr("href", signInPage);
        }).catch(function(error) {
            console.log("signout failed")
        });
    }
    else {
        console.log("authstatechanged FALSE");
        $(location).attr("href", signInPage);
    }
    }
    )});