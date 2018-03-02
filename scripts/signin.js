$(document).ready(function(){
    //Clear all error messages
    $('#txtEmail').on('input',function(){$("#txtEmailNotify").text("");}); //similar with method oninput() in Pure JavaScript
    $('#txtPassword').on('input',function(){$("#txtPasswordNotify").text("");});

    //Handle enter key
    $(document).keydown(function (event) {if (event.keyCode === 13){$("#btnSignIn").click();}});

    //Begin sign in process
    $("#btnSignIn").click(function () {
        let uEmail = $("#txtEmail").val();
        let uPassword = $("#txtPassword").val();

        //Check form and sign in if all input data are good
        if (checkFormSignIn())
            signIn(uEmail,uPassword);
    });

    //Functions
    function checkFormSignIn() {
        let email = $("#txtEmail");
        let password = $("#txtPassword");

        //Form's validation
        if (email.val().length < 6 || validateEmailAddress(email.val()) === false){
            $("#txtEmailNotify").text("Email must be at least 5 characters and have @");
            email.focus();
            return false;
        }else if (password.val().length < 6){
            $("#txtPasswordNotify").text("Password must be at least 6 characters");
            password.focus();
            return false;
        }else
            return true;
    }
    function signIn(email,password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                let user = firebase.auth().currentUser;

                //Get user information
                writeToLogs(0,"Successfully logged in with userID: " + user.uid);
                $("#signIn").hide();
                getUserInfo(user.uid);
            })
            .catch(function(error) {writeToLogs(error.code,error.message);});
    }
});