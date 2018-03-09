$(document).ready(function(){
    //Get HTML DOM elements and access several times
    let eleEmail = $("#txtEmail");
    let txtEmailNotify = $("#txtEmailNotify");
    let elePassword = $("#txtPassword");
    let txtPasswordNotify = $("#txtPasswordNotify");
    let eleDisplayName = $("#txtDisplayName");
    let txtDisplayNameNotify = $("#txtDisplayNameNotify");
    let elePhoneNumber = $("#txtPhoneNumber");
    let txtPhoneNumberNotify = $("#txtPhoneNumberNotify");
    let elePhotoUrl = $("#txtPhotoUrl");
    let txtPhotoUrlNotify = $("#txtPhotoUrlNotify");
    let btnSignUp = $("#btnSignUp");

    //MAIN
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            //Store current user info to localStorage and reuse after
            let objUserInfo = {};
            let nodeRef = database.ref("users/" + user.uid);
            nodeRef.once("value")
                .then(function (snapshot) {
                    //Create object objUserInfo
                    objUserInfo = {
                        userId: user.uid,
                        displayName: snapshot.val().displayName,
                        phoneNumber: snapshot.val().phoneNumber,
                        photoUrl: snapshot.val().photoUrl};

                    //Store to localStorage
                    if (typeof(Storage) !== "undefined")
                        localStorage.chatappUserInfo = JSON.stringify(objUserInfo);

                    //Redirect to the chat page
                    goToChat();
                })
                .catch(function (error) {writeToLogs(error.code,error.message);});
        } else {
            // No user is signed in.
            goToSignUp();
        }
    });
    /*let user = auth.currentUser;
    if (user) {
        // User is signed in.
        goToChat();
    } else {
        // No user is signed in.
        goToSignUp();
    }*/

    //FUNCTIONS
    function goToSignUp() {
        //Clear all error messages
        eleEmail.on('input',function(){txtEmailNotify.text("");});
        elePassword.on('input',function(){txtPasswordNotify.text("");});
        eleDisplayName.on('input',function(){txtDisplayNameNotify.text("");});
        elePhoneNumber.on('input',function(){txtPhoneNumberNotify.text("");});
        elePhotoUrl.on('input',function(){txtPhotoUrlNotify.text("");});

        //Handle enter key (keycode === 13)
        $(document).keydown(function (event) {if (event.keyCode === 13){btnSignUp.click();}});

        //Begin sign up process
        btnSignUp.click(function () {
            //Form's validation -true-> Create new user and login automatic if all input data are good
            if (checkFormSignUp(eleEmail,elePassword,eleDisplayName,elePhoneNumber,elePhotoUrl))
                createUser(eleEmail.val(),elePassword.val(),eleDisplayName.val(),elePhoneNumber.val(),elePhotoUrl.val());
        });
    }
    function checkFormSignUp(eleEmail,elePassword,eleDisplayName,elePhoneNumber,elePhotoUrl) {
        if (eleEmail.val().length < 6 || validateEmailAddress(eleEmail.val()) === false){
            txtEmailNotify.text("Email must be at least 6 characters and have @");
            eleEmail.focus();
            return false;
        }else if (elePassword.val().length < 6){
            txtPasswordNotify.text("Password must be at least 6 characters");
            elePassword.focus();
            return false;
        }else if(eleDisplayName.val().length < 6){
            txtDisplayNameNotify.text("Display name must be at least 6 characters");
            eleDisplayName.focus();
            return false;
        }else if(elePhoneNumber.val().length > 0 && elePhoneNumber.val().length < 6){
            txtPhoneNumberNotify.text("Telephone number must be at least 6 characters");
            elePhoneNumber.focus();
            return false;
        }
        else if(elePhotoUrl.val().length > 0 && elePhotoUrl.val().length < 10){
            txtPhotoUrlNotify.text("Photo URL must be at least 10 characters and have http://");
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
            .then(function () {
                //Creating new user is successfully
                goToChat();//Redirect to chat page
            })
            .catch(function (error) {writeToLogs(error.code,"fnCreateUserInAppDb: "+error.message);});
    }
    function createUser(email, password, displayName, phoneNumber, photoUrl) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(function() {
                //Login
                auth.signInWithEmailAndPassword(email, password)
                    .then(function () {
                        //Update profile
                        let user = auth.currentUser;
                        user.updateProfile({displayName: displayName})
                        .then(function() {
                            //Create user in Firebase database when updating successful
                            createUserInAppDb(auth.currentUser.uid,displayName,phoneNumber,photoUrl);
                        }).catch(function(error) {writeToLogs(error.code,"fnCreateUser: "+error.message);});
                    })
                    .catch(function(error) {writeToLogs(error.code,"fnCreateUser/SignIn: "+error.message);});
            })
            .catch(function(error) {writeToLogs(error.code,"fnCreateUser: "+error.message);});
    }
});
