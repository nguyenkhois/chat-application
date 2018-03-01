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

//---------------------------Other---------------------------
function writeToLogs(errorCode,errorMessage) {
    let message;
    if (parseInt(errorCode) === 0)
        message = "<p class='messageSucceed'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";
    else
        message = "<p class='messageError'>"+getCurrentTime()+" Error code: "+errorCode+" - Error message: "+errorMessage+"</p>";

    $("#systemMessages").prepend(message);
}
function clearForm(){
    $("input").val("");
}