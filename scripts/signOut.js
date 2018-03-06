
function signOut () {

firebase.auth().signOut().then(function() {

    console.log("Signout successful");

    localStorage.clear();
    localStorage.removeItem("firebase:host:project-xxxxxxxxxx.firebaseio.com");


}, function(error) {
    console.log(error);

});
}
signOut();