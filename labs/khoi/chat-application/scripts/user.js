$(document).ready(function(){
    $("#btnCreateUser").click(function () {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();
        let uFullname = $("#txtFullname").val();
        let uPhoneNumber = $("#txtPhoneNumber").val();

        // Create the user account
        firebase.auth().createUserWithEmailAndPassword(uEmail, uPassword)
            .then(function() {
                writeToLogs(0,"Successfully created new user with email: " + uEmail);

                //Login with email and password
                firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
                    .then(function () {
                        writeToLogs(0,"Successfully logged in with email: " + uEmail);
                        let user = firebase.auth().currentUser;

                        //Update user profile
                        user.updateProfile({
                            displayName: uFullname,
                            phoneNumber: uPhoneNumber
                        }).then(function() {
                            //Create new user in own Real-time Firebase database with information in user profile
                            createUser(user.uid,user.displayName);
                            writeToLogs(0,"Created new user in own FB with fullname is: " + user.displayName);
                            clearForm();
                        }).catch(function(error) {
                            // An error happened.
                            console.log(error);
                        });
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        if (errorCode !== '')
                            writeToLogs(errorCode,errorMessage);
                    });
            })
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode !== '')
                    writeToLogs(errorCode,errorMessage);
            });
    });
    $("#btnLogin").click(function () {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();

        firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
            .then(function () {
                let user = firebase.auth().currentUser;
                let userId = user.uid;

                writeToLogs(0,"Successfully logged in with user ID: " + userId);

                //Get user information
                $("#frmLogin").hide();
                getUserInfo(userId);
            })
            .catch(function(error) {
                // An error happened.
                console.log(error);
            });
    });
});

//Functions
function createUser(userId, txtFullname){
    let nodeRef = database.ref("users/" + userId);
    nodeRef.set({uFullname:txtFullname,
                 isActive:true});
}
function getUserInfo(userId) {
    let nodeRef = database.ref().child("users/" + userId);
    nodeRef.once("value")
        .then(function (snapshot) {
            $("#dspUserInfo").text(snapshot.val().uFullname+" logged in");
        })
        .catch(function (error) {
            return "Find not found!";
        });
}
