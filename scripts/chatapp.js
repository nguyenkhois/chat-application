$(document).ready(function () {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            //User is signed in.
            getUserInfo(user.uid);
            getChannels();
            getUserList();
            getMessages();

            $("#txtMessage").focus();
            $("#btnSend").click(function () {
                sendAMessage(user);
            });

            //Handle enter key (keycode === 13)
            $(document).keypress(function(e) {
                let keycode = (e.keyCode ? e.keyCode : e.which);
                if (keycode === '13') {
                    sendAMessage(user);
                }
            });
        } else {
            // No user is signed in.
            $("#lnkSignOut").hide();
            goToSignIn();
        }
    });

    //FUNCTIONS
    //Channels
    function getChannels() {
        let nodeRef = database.ref("channels/").orderByChild("channelName");
        nodeRef.on('value',function (snapshot) {
            $("#dspChannels").html("<h3>Channels</h3>");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAChannelLink(childSnapshot.val(),childSnapshot.key);
            });
        });
    }
    function buildAChannelLink(objData, objKey) {
        let channelLink = $("<p>").addClass("channel-item").text("#"+objData.channelName);
        $("#dspChannels").append(channelLink);

        $(channelLink).click(function () {
            storeChannel(objKey,objData.channelName);
        });
    }
    function storeChannel(channelId,channelName) {
        if (typeof(Storage) !== "undefined") {
            sessionStorage.chatappChannelId = channelId;
            $("#dspCurrentChannel").text("#"+channelName);
            getMessages();
        }
    }
    function retrieveChannel() {
        if (typeof(Storage) !== "undefined")
            return sessionStorage.chatappChannelId;
        else
            return 1; //It returns to the default channel which has ID=1
    }
    
    //Users
    function getUserList() {
        let nodeRef = database.ref("users/").orderByChild("displayName");
        nodeRef.on('value',function (snapshot) {
            $("#dspUserList").html("<h3>Members</h3>");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAnUser(childSnapshot.val());
            });
        });
    }
    function buildAnUser(objData) {
        let userState = objData.isOnline;
        let aname = $("<p>").text(objData.displayName);

        if (userState)
            aname.addClass("userlist-online");

        $("#dspUserList").append(aname);
    }

    //Messages
    function sendAMessage(user) {
        let channelId = retrieveChannel();
        let newKey = database.ref("messages/").push().key;
        let nodeRef = database.ref("messages/" + newKey);
        let message = $("#txtMessage").val();

        nodeRef.set({
            userId: user.uid,
            channelId: channelId,
            content: message,
            timeStamp: getCurrentDate() + " " + getCurrentTime()
            })
            .then(function () {
                $("#txtMessage").val("");
            })
            .catch(function(error) {writeToLogs(error.code, error.message);});
    }
    function getMessages() {
        let channelId = retrieveChannel();
        let nodeRef = database.ref("messages/").orderByChild("channelId").equalTo(channelId);
        nodeRef.on('value',function (snapshot) {
            $("#chatContents").html("");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAMessage(childSnapshot.val());
            });
        });
    }
    function buildAMessage(objData) {
        let message = $("<p>").html(objData.content);
        $("#chatContents").append(message);
    }
});
