function writeToLogs(errorCode,errorMessage) {
    let message;
    if (parseInt(errorCode) === 0)
        message = "<p class='messageSucceed'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";
    else
        message = "<p class='messageError'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";

    $("#systemMessages").prepend(message);
}

//---------- Firebase's functions ----------
function getUserInfo(userId) {
    let nodeRef = database.ref().child("users/" + userId);
    nodeRef.once("value")
        .then(function (snapshot) {
            let $message = $("<p></p>").html(snapshot.val().displayName + " logged in");
            $("#dspUserInfo").prepend($message);
        })
        .catch(function (error) {writeToLogs(error.code,"fnGetUserInfo: "+error.message);});
}
function goToChat() {$(location).attr('href', 'index.html');}
function goToSignIn() {$(location).attr('href', 'login.html');}
function setDefaultChannel() {
    if (typeof(Storage) !== "undefined")
        sessionStorage.chatappChannelId = 1;
    else
        return false;
}
function removeLocalStoredData() {
    if (typeof(Storage) !== "undefined" && sessionStorage.chatappChannelId)
        sessionStorage.removeItem("chatappChannelId");
    else
        return false
}