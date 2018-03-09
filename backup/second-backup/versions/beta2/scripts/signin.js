$(document).ready(function(){
    //Get HTML DOM elements and access several times.
    let eleEmail = $("#txtEmail");
    let txtEmailNotify = $("#txtEmailNotify");
    let elePassword = $("#txtPassword");
    let txtPasswordNotify = $("#txtPasswordNotify");
    let btnSignIn = $("#btnSignIn");

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
            goToSignIn();
        }
    });

    //FUNCTIONS
    function goToSignIn() {
        eleEmail.focus();

        //Clear all error messages
        eleEmail.on('input', function () {txtEmailNotify.text("");}); //similar with method oninput() in Pure JavaScript
        elePassword.on('input', function () {txtPasswordNotify.text("");});

        //Handle enter key (keycode === 13)
        $(document).keydown(function (event) {if (event.keyCode === 13) {btnSignIn.click();}});

        //Begin sign in process
        btnSignIn.click(function () {
            //Form validation ---if it returns true---> Sign in
            if (checkFormSignIn(eleEmail, elePassword))
                signIn(eleEmail.val(), elePassword.val());
        });
    }
    function checkFormSignIn(eleEmail, elePassword) {
        //Form validation
        if (eleEmail.val().length < 6 || validateEmailAddress(eleEmail.val()) === false) {
            txtEmailNotify.text("Email must be at least 6 characters and have @");
            eleEmail.focus();
            return false;
        } else if (elePassword.val().length < 6) {
            txtPasswordNotify.text("Password must be at least 6 characters");
            elePassword.focus();
            return false;
        } else
            return true;
    }
    function signIn(email, password) {
        auth.signInWithEmailAndPassword(email, password)
            .then(function () {
                //User is signed in.
                //Update user state in Firebase database
                let user = auth.currentUser;
                let nodeRef = database.ref("users/" + user.uid);
                nodeRef.update({isOnline: true})
                    .then(function () {
                        //Updated user state successfully
                    })
                    .catch(function(error) {writeToLogs(error.code, "fnUpdateUserState: "+error.message);});
            })
            .catch(function (error) {writeToLogs(error.code, "fnSignIn: "+error.message);});
    }
});