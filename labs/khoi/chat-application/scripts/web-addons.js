//---------- Number ----------
function convertStringToInterger(sNumber, fractionDigits) {
    let newNumber = parseFloat(Number(sNumber).toFixed(fractionDigits));
    if (Number.isInteger(newNumber))
        return newNumber;
    else
        return 0;
}
function getRandomNumber(minNr, maxNr) {
    return Math.floor(Math.random()*(maxNr-minNr+1)) + minNr;
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

//---------- Object and Array ----------
function buildJSONString(arrayOfObjects) {
    //Build JSON string from an array of objects
    //Input: an array of objects
    //Output: a JSON string

    let sJSON;
    let i;
    let arrLength = arrayOfObjects.length;

    sJSON = "[";
    for (i = 0; i < arrLength; i++){
        sJSON += JSON.stringify(arrayOfObjects[i]);//convert from an object to JSON string
        if (i < arrLength-1)
            sJSON += ",";
    }
    sJSON += "]";
    return sJSON;
}
function buildArrayOfObjects(sJSON) {
    //Build an array of objects from JSON string
    //Input: a JSON string
    //Output: an array of objects

    let arrNew = [];
    let objJSON = JSON.parse(sJSON); //convert from JSON string to JSON object
    let i;

    for (i in objJSON)
        arrNew.push(objJSON[i]); // add an object into an array

    return arrNew;
}


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