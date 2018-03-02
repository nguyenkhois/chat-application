$(document).ready(function(){
    $("#btnCreateUser").click(function (event) {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();
        let uDisplayName = $("#txtDisplayName").val();
        let uPhoneNumber = $("#txtPhoneNumber").val();
        let uPhotoURL = $("#txtPhotoURL").val();

        // Create the user account
        firebase.auth().createUserWithEmailAndPassword(uEmail, uPassword)
            .then(function() {
                writeToLogs(0,"Successfully created new user with email: " + uEmail);

                //Login with email and password
                firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
                    .then(function () {
                        writeToLogs(0,"Successfully logged in with email: " + uEmail);
                        let user = firebase.auth().currentUser;

                        createUser(user.uid,uDisplayName,uPhoneNumber,uPhotoURL);
                        $("#createUser").hide();
                    })
                    .catch(function(error) {writeToLogs(error.code,error.message);});
            })
            .catch(function(error) {writeToLogs(error.code,error.message);});
    });
    $("#btnLogin").click(function (event) {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();

        firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
            .then(function () {
                let user = firebase.auth().currentUser;

                writeToLogs(0,"Successfully logged in with userID: " + user.uid);
                //Get user information
                $("#login").hide();
                getUserInfo(user.uid);
            })
            .catch(function(error) {writeToLogs(error.code,error.message);});
    });
});

//Functions
function createUser(userId, txtDisplayName,txtPhoneNumber,txtPhotoURL){
    let nodeRef = database.ref("users/" + userId);
    nodeRef.set({displayName:txtDisplayName,
                 phoneNumber:txtPhoneNumber,
                 photoURL:txtPhotoURL,
                 isOnline:true})
            .then(function () {writeToLogs(0,"Created new user in own database with display name is: " + txtDisplayName);})
            .catch(function () {});

    getUserInfo(userId);
}
function getUserInfo(userId) {
    let nodeRef = database.ref().child("users/" + userId);
    nodeRef.once("value")
            .then(function (snapshot) {$("#dspUserInfo").text(snapshot.val().displayName+" logged in");})
            .catch(function (error) {writeToLogs(error.code,error.message);});
}
