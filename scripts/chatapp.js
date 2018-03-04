$(document).ready(function () {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            //User is signed in.
            getUserInfo(user.uid);
            getChannels();
            getUserList();
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
        }
    }
    function retrieveChannel() {
        if (typeof(Storage) !== "undefined")
            return sessionStorage.chatappChannelId;
        else
            return false;
    }
    
    //Users
    function getUserList() {
        let nodeRef = database.ref("users/").orderByChild("displayName");
        nodeRef.on('value',function (snapshot) {
            $("#dspUserList").html("<h3>Members</h3>");//clear the display before get new data
            snapshot.forEach(function (childSnapshot) {
                buildAnUser(childSnapshot.val(),childSnapshot.key);
            });
        });
    }
    function buildAnUser(objData, objKey) {
        let userState = objData.isOnline;
        let aname = $("<p>").text(objData.displayName);

        if (userState)
            aname.addClass("userlist-online");

        $("#dspUserList").append(aname);
    }
});
