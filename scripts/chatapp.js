$(document).ready(function () {
    //Get HTML elements and reuse later
    let dspChannels = $("#dspChannels");
    let dspCurrentChannel = $("#dspCurrentChannel");
    let dspUserList = $("#dspUserList");
    let dspCurrentUser = $("#dspCurrentUser");
    let hiddenUserInfo = $('#hiddenUserInfo');
    let txtMessage = $("#txtMessage");
    let chatContents = $("#chatContents");
    let btnSend = $("#btnSend");
    let chatApp = $("#chatApp");
    let image = $('<img>');
    let userInfo = JSON.parse(localStorage.getItem('chatappCurrentUserInfo'));

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
        if (typeof(Storage) !== "undefined" && sessionStorage.chatappChannelId)
            return sessionStorage.chatappChannelId;
        else
            return false
    }
    function getDefaultChannel() {
        let nodeRef = database.ref("channels/").orderByChild("defaultChannel").equalTo(true);
        return nodeRef.once("value")
            .then(function (snapshot) {
                return snapshot.val();
            }).catch(function () {});
    }

    //Users
    function getUserList() {
        let nodeRef = database.ref("users/").orderByChild("displayName");
        nodeRef.on('value',function (snapshot) {
            dspUserList.html("");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAnUser(childSnapshot.val());
            });
        });
    }
    function buildAnUser(objData) {
        let displayName = $("<p>").text(objData.displayName);
        let statusDot = $('<span>').text('●\t');

        if (objData.isOnline)
            displayName.addClass("userlist-online");
        else
            displayName.addClass("userlist-offline");

        displayName.prepend(statusDot);
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
                displayName: userInfo.displayName,
                channelId: channelId,
                content: message,
                timeStamp: getCurrentDate() + " " + getCurrentTime()})
                .then(function () {txtMessage.val("");})
                .catch(function(error) {writeToLogs(error.code, "fnSendAMessage: "+error.message);});
        }else{return false}
    }
    function getMessages(channelId) {
        if (parseInt(channelId)){
            let nodeRef = database.ref("messages/").orderByChild("channelId").equalTo(channelId);
            nodeRef.on('value',function (snapshot) {
                chatContents.html("");//clear the display before get new data
                snapshot.forEach(function (childSnapshot) {
                    buildAMessage(childSnapshot.val());
                });

                //K moved
                scrollChatContents();
                txtMessage.focus();
            });
        }else{return false}
    }
    function buildAMessage(objData) {
        //Get sender information
        let nodeRef = database.ref("users/" + objData.userId);
        nodeRef.once("value",function (snapshot) {
            let senderPhotoUrl;
            let existSender = false;

            //Get the sender photoUrl
            if (snapshot.val()){
                //The sender ID exist in Firebase database
                snapshot.val().photoUrl ? senderPhotoUrl = snapshot.val().photoUrl : senderPhotoUrl = defaultUserPhotoUrl;
                existSender = true;
            }else
            //The sender ID does not exist in Firebase database
                senderPhotoUrl = defaultUserPhotoUrl;


            //RENDER A COMPLETE MESSAGE
            //Definition for a message box
            let currentDate = getCurrentDate();
            let postedDate = objData.timeStamp.substr(0,objData.timeStamp.indexOf(' '));
            let dsplTime;
            if (currentDate !== postedDate)
                dsplTime = objData.timeStamp; //It is not today and the message has a fully datetime
            else
                dsplTime = "Today " + objData.timeStamp.substr(objData.timeStamp.indexOf(' ') + 1);

            //Definitions for message details
            let message = `<div class="message-userinfo">
                                <img src="${senderPhotoUrl}" alt=""><br>
                                ${$("<b>").html(objData.displayName).text()}                             
                            </div>
                            <div class="message-content">
                                <i>${dsplTime}</i><br>
                                ${$("<p>").html(objData.content).text()}
                            </div>`;

            let messageBox = $("<div>").html(message).addClass('messageBox');

            //The sender ID does not exist in Firebase database but the message found
            if (!existSender)
                messageBox.addClass("message-userinfo-not-exist");

            chatContents.append(messageBox);
        });
    }
    function scrollChatContents() {
        chatContents.scrollTop(chatContents[0].scrollHeight); //Modified by K
    }

    //MAIN
    auth.onAuthStateChanged(function(user) {
        if (user) {
            //User is signed in.
            //onDisconnect
            let onDisconnectRef = database.ref("users/" + user.uid);
            onDisconnectRef.onDisconnect().update({isOnline: false});

            //Get current user display name
            let currentUserDisplayName = $("<b>").text(userInfo.displayName + ' ▾').addClass("currentUser");
            dspCurrentUser.append(currentUserDisplayName);

            if (userInfo.photoUrl === "")
                dspCurrentUser.prepend("<p><img src='../images/icon-user.png'></p>");
            else {
                image.attr('src', userInfo.photoUrl);
                let imageContainer = $('<p>');
                imageContainer.append(image);
                dspCurrentUser.prepend(imageContainer);
            }

            //Show ChatApp content
            chatApp.removeClass("chatApp-hidden");

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
                if (keycode === '13'){
                    //K modified
                    //sendAMessage(user);
                    event.preventDefault();
                    btnSend.click();
                }
            });

            dspCurrentUser.on('click', function (event) {
                //Modified by K
                event.preventDefault();
                hiddenUserInfo.toggle();
            });
        } else
            // No user is signed in.
            goToSignIn();
    });
});
