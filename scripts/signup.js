$(document).ready(function(){
    //Clear all error messages
    $('#txtEmail').on('input',function(){$("#txtEmailNotify").text("");});
    $('#txtPassword').on('input',function(){$("#txtPasswordNotify").text("");});
    $('#txtDisplayName').on('input',function(){$("#txtDisplayNameNotify").text("");});
    $('#txtPhoneNumber').on('input',function(){$("#txtPhoneNumberNotify").text("");});
    $('#txtPhotoUrl').on('input',function(){$("#txtPhotoUrlNotify").text("");});

    //Handle enter key
    $(document).keydown(function (event) {if (event.keyCode === 13){$("#btnSignUp").click();}});

    //Begin sign up process
    $("#btnSignUp").click(function (event) {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();
        let uDisplayName = $("#txtDisplayName").val();
        let uPhoneNumber = $("#txtPhoneNumber").val();
        let uPhotoUrl = $("#txtPhotoUrl").val();

        //Check form and login automatic if all input data are good
        if (checkFormSignUp())
            createUser(uEmail,uPassword,uDisplayName,uPhoneNumber,uPhotoUrl);
    });

    //Functions
    function checkFormSignUp() {
        let email = $("#txtEmail");
        let password = $("#txtPassword");
        let displayName = $("#txtDisplayName");
        let phoneNumber = $("#txtPhoneNumber");
        let photoUrl = $("#txtPhotoUrl");

        if (email.val().length < 6 || validateEmailAddress(email.val()) === false){
            $("#txtEmailNotify").text("Email must be at least 6 characters and have @");
            email.focus();
            return false;
        }else if (password.val().length < 6){
            $("#txtPasswordNotify").text("Password must be at least 6 characters");
            password.focus();
            return false;
        }else if(displayName.val().length < 6){
            $("#txtDisplayNameNotify").text("Display name must be at least 6 characters");
            displayName.focus();
            return false;
        }else if(phoneNumber.val().length > 0 && phoneNumber.val().length < 6){
            $("#txtPhoneNumberNotify").text("Telephone number must be at least 6 characters");
            phoneNumber.focus();
            return false;
        }
        else if(photoUrl.val().length > 0 && photoUrl.val().length < 10){
            $("#txtPhotoUrlNotify").text("Photo URL must be at least 10 characters and have http://");
            photoUrl.focus();
            return false;
        }
        else
            return true;
    }
    function createUserInAppDb(userId, txtDisplayName,txtPhoneNumber,txtPhotoUrl){
        let nodeRef = database.ref("users/" + userId);
        nodeRef.set({displayName:txtDisplayName,
            phoneNumber:txtPhoneNumber,
            photoUrl:txtPhotoUrl,
            isOnline:true})
            .then(function () {writeToLogs(0,"Created new user in own database with display name is: " + txtDisplayName);})
            .catch(function () {});

        getUserInfo(userId);
    }
    function createUser(email, password, displayName, phoneNumber, photoUrl) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function() {
                writeToLogs(0,"Successfully created new user with email: " + email);

                //Login with email and password
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(function () {
                        writeToLogs(0,"Successfully logged in with email: " + email);
                        let user = firebase.auth().currentUser;

                        createUserInAppDb(user.uid,displayName,phoneNumber,photoUrl);
                        $("#signUp").hide();
                    })
                    .catch(function(error) {writeToLogs(error.code,error.message);});
            })
            .catch(function(error) {writeToLogs(error.code,error.message);});
    }
});

