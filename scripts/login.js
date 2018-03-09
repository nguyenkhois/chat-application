let knapp = document.getElementById("login");
let paragraf = document.getElementById("paragraf");


knapp.addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("username").value;
    let password = document.getElementById("pass").value;


    auth.signInWithEmailAndPassword(email, password)
        .then(function(){
            //let user = auth.currentUser;
            window.location.href = "index.html"
            let user = auth.currentUser;
            console.log(user);
        })
        .catch(function (error) {
            paragraf.innerHTML = "Error: " + error.message;
        });

});