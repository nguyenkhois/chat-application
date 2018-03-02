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
                            writeToLogs(error.code,error.message);
                        });
                    })
                    .catch(function(error) {
                        writeToLogs(error.code,error.message);
                    });
            })
            .catch(function(error) {
                writeToLogs(error.code,error.message);
            });
    });
    $("#btnLogin").click(function () {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();

        firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
            .then(function () {
                let user = firebase.auth().currentUser;

                writeToLogs(0,"Successfully logged in with userID: " + user.uid);

                //Get user information
                $("#frmLogin").hide();
                getUserInfo(user.uid);
            })
            .catch(function(error) {
                writeToLogs(error.code,error.message);
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
            writeToLogs(error.code,error.message);
        });
}
