function addNewUser(txtFullname,txtEmail,txtUsername,txtPassword){
    let path = "users";
    let newKey = firebase.database().ref().child(path).push().key;
    let nodeRef = database.ref(path + "/" + newKey);

    nodeRef.set({
        uFullname:txtFullname,
        uEmail:txtEmail,
        uUsername:txtUsername,
        uPassword:txtPassword});
}
function updateUser(txtKey,txtFullname,txtEmail,txtUsername,txtPassword) {
    let path = "users";
    let nodeRef = database.ref(path + "/" + txtKey);

    nodeRef.update({
        uFullname:txtFullname,
        uEmail:txtEmail,
        uUsername:txtUsername,
        uPassword:txtPassword});
}
function deleteUser(objKey) {
    let path = "users";
    let nodeRef = database.ref(path + "/" + objKey);

    nodeRef.remove();
}
function showUserList(objUserInfo, objKey) {
    let htmlContent = "";

    htmlContent += "<p><a href='#' onclick=\"deleteUser('"+ objKey +"');\">Delete</a> - ";
    htmlContent += "<a href='#' onclick=\"loadUserInfo('"+ objKey + "');\">Edit</a><br>";
    htmlContent += objKey + "<br>";
    htmlContent += objUserInfo.uFullname + "<br>";
    htmlContent += objUserInfo.uEmail + "<br>";
    htmlContent += objUserInfo.uUsername + "<br>";
    htmlContent += objUserInfo.uPassword + "<br></p>";

    $("#dspOutput").append(htmlContent);
}
function loadUserInfo(objKey) {
    let path = "users";
    let nodeRef = database.ref().child(path + "/" + objKey);

    nodeRef.once("value")
        .then(function (snapshot) {
            let userInfo = snapshot.val();
            /*console.log(userInfo);*/ //Used for testing purpose

            //Load data to form
            $("#txtKey").val(objKey);
            $("#txtFullname").val(userInfo.uFullname);
            $("#txtUsername").val(userInfo.uUsername);
            $("#txtPassword").val(userInfo.uPassword);
            $("#txtEmail").val(userInfo.uEmail);
        });
}
function clearForm() {
    $("#txtKey").val("");
    $("#txtFullname").val("");
    $("#txtEmail").val("");
    $("#txtUsername").val("");
    $("#txtPassword").val("");
}
