//Created for Kadar
//included in registration.html

$(document).ready(function () {

    //Get HTML elements
    let email = $('#txtEmail');
    let password = $('#txtPassword');
    let displayName = $('#txtDisplayName');
    let namePattern = /^[a-zA-Z-]+$/;
    let mailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    //Functions
    function userTest() {

        if (!namePattern.test($('#txtDisplayName').val()) || $('#txtDisplayName').val() === '') {
            displayName.attr('placeholder', 'Enter a display name');
            displayName.addClass('errorClass');
            $('#txtDisplayName').val('');
            displayName.focus();
        }

        else if (!mailPattern.test($('#txtEmail').val()) || $('#txtEmail').val() === '') {
            email.attr('placeholder', "Enter a valid email address");
            email.addClass('errorClass');
        }
        else if ($('#txtPassword').val() === '' || $('#txtPassword').val().length < 6) {
            password.attr('placeholder', "Password must be at least 6 character");
            password.addClass('errorClass');
        }
        else {
            return true;
        }

    }


    //MAIN
    $('#btnCreateAccount').click(function (event) {
        //event.preventDefault();

        //do stuff
        if (userTest()) {
            console.log('bra');
        }
        
        
        
        
    });


});


    /*/!*f$('#submit').on('click', function (event) {
        event.preventDefault();
        validateUser();
        ullname = $('#firstname').val() + ' ' + $('#lastname').val();
        username = $('#username').val();
        email = $('#mail').val();
        password = $('#pass').val();
        signUpUser(fullname, username, email, password);
        $('#firstname').val('');
        $('#lastname').val('');
        $('#username').val('');
        $('#mail').val('');
        $('#pass').val('');*!/

        /!*firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(user){
                console.log("Successfully created user account with uid:", user.uid);
                createUser();
            })
            .catch(function(error){
                console.log("Error creating user:", error);
            });
    });*!/
    /!*firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('user signed up');
            $('#logo').text(user.uid);
        }
        else {
            console.log('not logged in ');
        }
    });
*!/
    function signUpUser (fullname, username, email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(user){
                console.log("Successfully created user account with uid:", user.uid);
                userId = user.uid;
                createUser(userId, fullname, username, email);

                window.location.replace("../views/test.html");
            })
            .catch(function(error){
                console.log("Error creating user:", error);
            });
    }

    function createUser (userId, fullname, username, email) {
        firebase.database().ref('users/' + userId).set({
            fullname: fullname,
            username: username,
            email: email

        });
        var aUser = firebase.auth().currentUser;

        aUser.updateProfile({
            displayName: username,
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
            console.log("Successfully created user account with username:", aUser.displayName);
            // Update successful.
        }).catch(function(error) {
            // An error happened.
        });
    }

    $('#loginBtn').on('click', function (event) {
        event.preventDefault();
        email = $('#loginmail').val();
        password = $('#loginpass').val();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user){
                console.log("Successfully logged in user account with uid:", firebase.auth().currentUser.uid);
                /!*userId = user.uid;
                createUser(userId, fullname, username, email);
                window.location.replace("../views/test.html");*!/

            })
            .catch(function(error){
                console.log("Error creating user:", error);
            });
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $('#nameSpan').append(' ' + user.displayName);
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });
    $('#nameSpan').on('click', function (event) {
        event.preventDefault();
        $('.signingOut').toggle();
    });

});

/!*
let signUpBtn = document.getElementById("submit");
//let  firstName = document.getElementById("firstname").value;
//let lastName = document.getElementById("lastname").value;
let textmail = document.getElementById("mail");
let textpass = document.getElementById("pass");

/!*function createUser(mail, pass) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}*!/

signUpBtn.addEventListener('click', e => {
    const email = textmail.value;
    const pass = textpass.value;
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(function (user) {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log('user signed up');
            }
            else {
                console.log('not logged in ');
            }
        })
        .catch(e => {
            console.log(e.message);
        });
        // Handle Errors here.
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ...

});
*!/


/!*firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log('user signed up');
    }
    else {
        console.log('not logged in ');
    }
});*!/*/

