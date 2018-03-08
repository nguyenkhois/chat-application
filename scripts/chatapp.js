$(document).ready(function () {
    let dspChannels = $("#dspChannels");
    let dspCurrentChannel = $("#dspCurrentChannel");
    let dspUserList = $("#dspUserList");
    let dspCurrentUser = $("#dspCurrentUser");
    let txtMessage = $("#txtMessage");
    let chatContents = $("#chatContents");
    let btnSend = $("#btnSend");
    let chatApp = $("#chatApp");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //User is signed in.
            //Get current user display name
            let currentUserDisplayName = $("<b>").text(user.displayName);
            dspCurrentUser.append(currentUserDisplayName);
            dspCurrentUser.prepend("<p><img src='images/icon-user.png'></p>");

            //Get components
            getChannels();
            getUserList();

            //Get messages in default channel
            let objDefaultChannel = getDefaultChannel();
            objDefaultChannel.then(function (result) {
                let defaultChannelId = Object.keys(result)[0];
                let defaultChannelName = result[defaultChannelId].channelName;
                storeChannel(defaultChannelId,defaultChannelName);
            });

            //Assign onclick function to button Send end Enter key
            btnSend.click(function(){sendAMessage(user);});

            //Handle enter key
            $(document).keydown(function(event) {
                let keycode = (event.keyCode ? event.keyCode : event.which);
                if (keycode === '13')
                    sendAMessage(user);
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
            dspChannels.html("<h3>Channels</h3>");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAChannelLink(childSnapshot.val(),childSnapshot.key);
            });
        });
    }
    function buildAChannelLink(objData, objKey) {
        let channelLink = $("<p>")
            .addClass("channel-item")
            .text("# "+objData.channelName)
            .click(function () {storeChannel(objKey,objData.channelName)});
        dspChannels.append(channelLink);
    }
    function storeChannel(channelId,channelName) {
        if (typeof(Storage) !== "undefined") {
            sessionStorage.chatappChannelId = channelId;
            dspCurrentChannel.text("# "+channelName);
            getMessages(channelId);//reload all messages which are in the chosen channel
        }
    }
    function retrieveChannel() {
        if (typeof(Storage) !== "undefined" && sessionStorage.chatappChannelId){
            return sessionStorage.chatappChannelId;
        }else
            return false
    }
    function getDefaultChannel() {
        let nodeRef = database.ref("channels/").orderByChild("defaultChannel").equalTo(true);
        return nodeRef.once("value")
                    .then(function (snapshot) {
                        return snapshot.val();
                    })
                    .catch(function () {});
    }

    //Users
    function getUserList() {
        let nodeRef = database.ref("users/").orderByChild("displayName");
        nodeRef.on('value',function (snapshot) {
            dspUserList.html("<h3>Members</h3>");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAnUser(childSnapshot.val());
            });
        });
    }
    function buildAnUser(objData) {
        let displayName = $("<p>").text(objData.displayName);

        if (objData.isOnline)
            displayName.addClass("userlist-online");

        dspUserList.append(displayName);
    }

    //Messages
    function sendAMessage(user) {
        if (user){
            let channelId = retrieveChannel();
            let newKey = database.ref("messages/").push().key;
            let nodeRef = database.ref("messages/" + newKey);
            let message = txtMessage.val();

            nodeRef.set({
                userId: user.uid,
                displayName: user.displayName,
                channelId: channelId,
                content: message,
                timeStamp: getCurrentDate() + " " + getCurrentTime()
                })
                .then(function () {txtMessage.val("");})
                .catch(function(error) {writeToLogs(error.code, "fnSendAMessage: "+error.message);});
        }
        else{return false}
    }
    function getMessages(channelId) {
        if (parseInt(channelId)){
            let nodeRef = database.ref("messages/").orderByChild("channelId").equalTo(channelId);
            nodeRef.on('value',function (snapshot) {
                chatContents.html("");//clear the display before get new data
                snapshot.forEach(function (childSnapshot) {
                    buildAMessage(childSnapshot.val());
                });
            });
            txtMessage.focus();
        }
        else{return false}
    }
    function buildAMessage(objData) {
        let displayName = $("<b>").text(objData.displayName);
        let message = $("<p>").html(": " + objData.content + " ");
        let timeStamp = $("<i>").html("(" + objData.timeStamp + ")");
        message.prepend(displayName);
        message.append(timeStamp);

        chatContents.append(message);
    }
});
