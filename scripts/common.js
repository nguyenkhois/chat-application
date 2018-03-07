function writeToLogs(errorCode,errorMessage) {
    let message;
    if (parseInt(errorCode) === 0)
        message = "<p class='messageSucceed'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";
    else
        message = "<p class='messageError'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";

    $("#systemMessages").prepend(message);
}

//---------- Firebase's functions ----------
function goToChat() {$(location).attr('href', 'index.html');}
function goToSignIn() {$(location).attr('href', 'signin.html');}
function removeLocalStoredData() {
    if (typeof(Storage) !== "undefined"){
        localStorage.removeItem("chatappChannelId");
        localStorage.removeItem("chatappUserInfo");
    }
    else
        return false
}
function retrieveCurrentUserInfo() {
    if (typeof(Storage) !== "undefined" && localStorage.chatappUserInfo)
        return JSON.parse(localStorage.chatappUserInfo);
    else
        return false
}