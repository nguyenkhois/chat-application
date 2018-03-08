$('#dspUserInfo').find('a').on('click', function (event) {
    event.preventDefault();
    signOut();
});
function signOut () {

    let nodeRef = database.ref("users/" + user.uid);
    nodeRef.update({isOnline: false})
        .then(function () {

            firebase.auth().signOut().then(function () {

                console.log("Signout successful");
                localStorage.clear();
                localStorage.removeItem("firebase:host:project-xxxxxxxxxx.firebaseio.com");


            }, function (error) {
                console.log(error);
                $("#dspUserInfo").text("Signout successful");
                window.location('login.html');

            });
        })
}
//signOut();

