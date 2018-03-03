$(document).ready(function(){
    auth.onAuthStateChanged(function(user) {
        if (user) {//User is signed in.
            goToChat();
        }else{
            //Get HTML DOM elements and access several times.
            let eleEmail = $("#txtEmail");
            let elePassword = $("#txtPassword");
            let btnSignIn = $("#btnSignIn");

            eleEmail.focus();

            //Clear all error messages
            eleEmail.on('input', function () {$("#txtEmailNotify").text("");}); //similar with method oninput() in Pure JavaScript
            elePassword.on('input', function () {$("#txtPassword").text("");});

            //Handle enter key (keycode === 13)
            $(document).keydown(function (event) {if (event.keyCode === 13) {btnSignIn.click();}});

            //Begin sign in process
            btnSignIn.click(function () {
                //Check form -true-> Sign in if all input data are good
                if (checkFormSignIn(eleEmail, elePassword))
                    signIn(eleEmail.val(), elePassword.val());
            });

            //Functions
            function checkFormSignIn(eleEmail, elePassword) {
                //Form's validation
                if (eleEmail.val().length < 6 || validateEmailAddress(eleEmail.val()) === false) {
                    $("#txtEmailNotify").text("Email must be at least 6 characters and have @");
                    eleEmail.focus();
                    return false;
                } else if (elePassword.val().length < 6) {
                    $("#txtPasswordNotify").text("Password must be at least 6 characters");
                    elePassword.focus();
                    return false;
                } else
                    return true;
            }
            function signIn(email, password) {
                auth.signInWithEmailAndPassword(email, password)
                    .then(function () {goToChat();})//Redirect to chat page
                    .catch(function (error) {writeToLogs(error.code, error.message);});
            }
        }
    });
});