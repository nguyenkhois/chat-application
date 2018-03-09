let user = auth.currentUser;
console.log("user", user)
$('#dspUserInfo').find('a').on('click', function (event) {
    event.preventDefault();
    //auth.signOut();
});

console.log(user);


/*auth.onAuthStateChanged(function(user) {
    if(user) {
        signOut(user);
    }
});

function signOut (user) {

    let nodeRef = database.ref("users/" + user.uid);
    nodeRef.update({isOnline: false})
        .then(function () {

            auth.signOut().then(function () {

                console.log("Signout successful");
                //localStorage.clear();
                //localStorage.removeItem("firebase:host:project-xxxxxxxxxx.firebaseio.com");


            }, function (error) {
                console.log(error);
                $("#dspUserInfo").text("Signout successful");
                window.location('login.html');

            });
        })
}*/
//signOut();

