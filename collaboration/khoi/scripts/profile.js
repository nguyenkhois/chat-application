$(document).ready(function () {
    //Get HTML elements
    let dspCurrentUserPhoto = $("#dspCurrentUserPhoto");
    let txtDisplayName = $("#txtDisplayName");
    let txtNewPassword = $("#txtNewPassword");
    let txtRetypePassword = $("#txtRetypePassword");
    let txtPhoneNumber = $("#txtPhoneNumber");
    let txtPhotoUrl = $("#txtPhotoUrl");

    //FUNCTIONS
    function retrieveCurrentUserInfo() {
        if (typeof(Storage) !== "undefined" && localStorage.chatappCurrentUserInfo)
            return JSON.parse(localStorage.chatappCurrentUserInfo);
        else
            return false
    }
    function updateProfile(userId, newDisplayName, newPassword, newPhoneNumber, newPhotoUrl){
        let user = auth.currentUser;
        user.updatePassword(newPassword).then(function() {
            // Update successful.
            let nodeRef = database.ref("users/" + userId);
            nodeRef.update({displayName: newDisplayName,
                            phoneNumber: newPhoneNumber,
                            photoUrl: newPhotoUrl})
                .then(function () {
                    //Updated user profile successfully
                    let objUserInfo = {
                        userId: user.uid,
                        displayName: newDisplayName,
                        phoneNumber: newPhoneNumber,
                        photoUrl: newPhotoUrl};

                    if (typeof(Storage) !== "undefined")
                        localStorage.chatappCurrentUserInfo = JSON.stringify(objUserInfo);

                    $("#systemMessages").text("Updating for your profile is successfully!");
                    $(location).attr("href",chatPage);
                })
                .catch(function(error) {});
        }).catch(function(error) {});
    }
    function validateUpdateProfile(){
        if (!namePattern.test(txtDisplayName.val()) || txtDisplayName.val() === '') {
            txtDisplayName.attr('placeholder', 'Enter a display name');
            txtDisplayName.addClass('errorClass');
            txtDisplayName.val('');
            txtDisplayName.focus();
            return false
        }else if(txtNewPassword.val() === '' || txtNewPassword.val().length < 6){
            txtNewPassword.attr('placeholder', "Password must be at least 6 character");
            txtNewPassword.addClass('errorClass');
            txtNewPassword.focus();
            return false
        }else if(txtRetypePassword.val() === '' || txtRetypePassword.val().length < 6){
            txtRetypePassword.attr('placeholder', "Confirm password must be at least 6 character");
            txtRetypePassword.addClass('errorClass');
            txtRetypePassword.focus();
            return false
        }else if(txtNewPassword.val() !== txtRetypePassword.val()){
            txtNewPassword.val('');
            txtRetypePassword.val('');
            txtNewPassword.attr('placeholder', "Password and confirm password not match");
            txtNewPassword.addClass('errorClass');
            txtNewPassword.focus();
            return false
        }else
            return true
    }

    //MAIN
    auth.onAuthStateChanged(function(user) {
        if (user) {
            let objCurrentUserInfo = retrieveCurrentUserInfo();
            if (objCurrentUserInfo && objCurrentUserInfo.userId === user.uid){
                let currentUserPhotoUrl = objCurrentUserInfo.photoUrl;
                if (!currentUserPhotoUrl)
                    currentUserPhotoUrl = defaultUserPhotoUrl;
                dspCurrentUserPhoto.append($("<img>").attr("src",currentUserPhotoUrl).addClass("userinfo-photo"));
                txtDisplayName.val(objCurrentUserInfo.displayName);
                txtPhoneNumber.val(objCurrentUserInfo.phoneNumber);
                txtPhotoUrl.val(objCurrentUserInfo.photoUrl);
            }
            $("#btnUpdateProfile").click(function () {
                if (validateUpdateProfile())
                    updateProfile(user.uid, txtDisplayName.val(), txtNewPassword.val(), txtPhoneNumber.val(), txtPhotoUrl.val());
            });
        }else
            $(location).attr("href",signInPage);
    });
});