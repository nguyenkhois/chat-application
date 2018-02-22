$(document).ready(function(){

    $("#btnCreateUser").click(function () {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();
        let uFullname = $("#txtFullname").val();
        let uPhoneNumber = $("#txtPhoneNumber").val();

        firebase.auth().createUserWithEmailAndPassword(uEmail, uPassword)
            .then(function() {
                // Create the user account successful.
                writeToLogs(0,"Successfully created new user with email: " + uEmail);
                firebase.auth().signInWithEmailAndPassword(uEmail, uPassword)
                    .then(function () {
                        writeToLogs(0,"Successfully logged in with email: " + uEmail);
                        let user = firebase.auth().currentUser;

                        user.updateProfile({
                            displayName: uFullname
                        }).then(function() {
                            // Update successful.
                            writeToLogs(0,"Successfully updated new user profile with fullname is: " + user.displayName);
                            clearForm();
                        }).catch(function(error) {
                            // An error happened.
                        });
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        if (errorCode === 'auth/wrong-password') {
                            alert('Wrong password.');
                        } else {
                            alert(errorMessage);
                        }
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
    });
});

function writeToLogs(errorCode,errorMessage) {
    let message;
    if (parseInt(errorCode) === 0)
        message = "<p class='messageSucceed'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";
    else
        message = "<p class='messageError'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";

    $("#systemMessages").prepend(message);
}
function clearForm(){
    $("input").val("");
}