$(document).ready(function(){
    $("#btnSubmit").click(function () {
        let txtFullname = $("#txtFullname").val();
        let txtEmail = $("#txtEmail").val();
        let txtUsername = $("#txtUsername").val();
        let txtPassword = $("#txtPassword").val();

        addNewUser(txtFullname,txtEmail,txtUsername,txtPassword);
        clearForm();//Clear form
    });
    $("#btnEdit").click(function () {
        let txtKey = $("#txtKey").val();
        let txtFullname = $("#txtFullname").val();
        let txtEmail = $("#txtEmail").val();
        let txtUsername = $("#txtUsername").val();
        let txtPassword = $("#txtPassword").val();

        updateUser(txtKey,txtFullname,txtEmail,txtUsername,txtPassword);
        clearForm();
    });
});

