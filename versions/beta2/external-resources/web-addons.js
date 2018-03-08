//---------- Date time ----------
function addZeroToDateTime(sString){
    if (sString.toString().length === 1){
        sString = "0" + sString;
    }
    return sString;
}
function getCurrentDate(){
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth()+1; //The numeric representation of months in JavaScript start on '0', so you will need to add the code necessary for making the months start on '1'
    let year = currentDate.getFullYear();

    return year + "-" + addZeroToDateTime(month) + "-" + addZeroToDateTime(date);
}
function getCurrentTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    return addZeroToDateTime(hours) + ":" + addZeroToDateTime(minutes)  + ":" + addZeroToDateTime(seconds);
}

//---------- Validation ----------
function validateEmailAddress(sEmail) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(sEmail);
}
function limitInputLength(elementID,length) {
    let userKeyPress = window.event ? event.which : event.keyCode;
    if (document.getElementById(elementID).value.length === length && userKeyPress !== 8){
        event.preventDefault();
        return false;
    }else
        return true;
}
function forceKeyPressNumber() {
    let userKeyPress = window.event ? event.which : event.keyCode;
    if (userKeyPress !== 8){
        if (userKeyPress < 48 || userKeyPress > 57){
            event.preventDefault(); //stop the key press
            return false;
        }
    }else
        return true;
}