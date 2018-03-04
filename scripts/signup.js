$(document).ready(function(){
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            goToChat();
        } else {
            // No user is signed in.
            //Get HTML DOM elements and access several times
            let eleEmail = $("#txtEmail");
            let elePassword = $("#txtPassword");
            let eleDisplayName = $("#txtDisplayName");
            let elePhoneNumber = $("#txtPhoneNumber");
            let elePhotoUrl = $("#txtPhotoUrl");
            let btnSignUp = $("#btnSignUp");

            //Clear all error messages
            eleEmail.on('input',function(){$("#txtEmailNotify").text("");});
            elePassword.on('input',function(){$("#txtPasswordNotify").text("");});
            eleDisplayName.on('input',function(){$("#txtDisplayNameNotify").text("");});
            elePhoneNumber.on('input',function(){$("#txtPhoneNumberNotify").text("");});
            elePhotoUrl.on('input',function(){$("#txtPhotoUrlNotify").text("");});

            //Handle enter key (keycode === 13)
            $(document).keydown(function (event) {if (event.keyCode === 13){btnSignUp.click();}});

            //Begin sign up process
            btnSignUp.click(function () {
                //Form's validation -true-> Create new user and login automatic if all input data are good
                if (checkFormSignUp(eleEmail,elePassword,eleDisplayName,elePhoneNumber,elePhotoUrl))
                    createUser(eleEmail.val(),elePassword.val(),eleDisplayName.val(),elePhoneNumber.val(),elePhotoUrl.val());
            });

            //Functions
            function checkFormSignUp(eleEmail,elePassword,eleDisplayName,elePhoneNumber,elePhotoUrl) {
                if (eleEmail.val().length < 6 || validateEmailAddress(eleEmail.val()) === false){
                    $("#txtEmailNotify").text("Email must be at least 6 characters and have @");
                    eleEmail.focus();
                    return false;
                }else if (elePassword.val().length < 6){
                    $("#txtPasswordNotify").text("Password must be at least 6 characters");
                    elePassword.focus();
                    return false;
                }else if(eleDisplayName.val().length < 6){
                    $("#txtDisplayNameNotify").text("Display name must be at least 6 characters");
                    eleDisplayName.focus();
                    return false;
                }else if(elePhoneNumber.val().length > 0 && elePhoneNumber.val().length < 6){
                    $("#txtPhoneNumberNotify").text("Telephone number must be at least 6 characters");
                    elePhoneNumber.focus();
                    return false;
                }
                else if(elePhotoUrl.val().length > 0 && elePhotoUrl.val().length < 10){
                    $("#txtPhotoUrlNotify").text("Photo URL must be at least 10 characters and have http://");
                    elePhotoUrl.focus();
                    return false;
                }
                else
                    return true;
            }
            function createUserInAppDb(userId, txtDisplayName,txtPhoneNumber,txtPhotoUrl){
                let nodeRef = database.ref("users/" + userId);
                nodeRef.set({displayName: txtDisplayName,
                    phoneNumber: txtPhoneNumber,
                    photoUrl: txtPhotoUrl,
                    isOnline: true})
                    .then(function () {goToChat();})//Redirect to chat page
                    .catch(function (error) {writeToLogs(error.code,error.message);});
            }
            function createUser(email, password, displayName, phoneNumber, photoUrl) {
                auth.createUserWithEmailAndPassword(email, password)
                    .then(function() {
                        //Login
                        auth.signInWithEmailAndPassword(email, password)
                            .then(function () {createUserInAppDb(auth.currentUser.uid,displayName,phoneNumber,photoUrl);})
                            .catch(function(error) {writeToLogs(error.code,error.message+"here");});
                    })
                    .catch(function(error) {writeToLogs(error.code,error.message);});
            }
        }
    });

});

