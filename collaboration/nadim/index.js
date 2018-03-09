
(function() {

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyA1b5NdqopObtEv0rjOP4_4FrDaXTjFeBU",
        authDomain: "firechat-3fcc5.firebaseapp.com",
        databaseURL: "https://firechat-3fcc5.firebaseio.com",
        projectId: "firechat-3fcc5",
        storageBucket: "firechat-3fcc5.appspot.com",
        messagingSenderId: "210046629739"
    };
    firebase.initializeApp(config);


const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnSubmit');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogOut = document.getElementById('btnOut');


//Add login event
    btnLogin.addEventListener('click', e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign In
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    });

    btnSignUp.addEventListener('click', e => {
     const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    //Sign In
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});


    btnLogOut.addEventListener('click', e => {

        firebase.auth().signOut();
    });

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        console.log(firebaseUser);
        btnLogOut.setAttribute("style", "visibility:visible");
    }else {
        console.log('not logged in');
    }

});

}());