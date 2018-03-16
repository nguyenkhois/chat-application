# ChatApp
* [Online demo for version 1.1.x](https://www.vlexikon.com/demo/js-chatapp/v1.1/views/)

## Installation
* Config to your Firebase database here: `/scripts/config.js`
* Create chat channels by run `/tools/create-channels.html`
* Begin using ChatApp now by run `index.html` (^_~)

## Changelog
### Version 1.1.2 (2018-03-16)
* Using .onDisconnect() in Firebase database
* Using Firebase version 4.11.0
### Version 1.1.1 (2018-03-15)
* Fixed bugs
### Version 1.1 (2018-03-14)
* Added sender avatar to messages
* Fixed bugs for message timestamp
* Fixed bugs for display name, user list
* Improved menu for the current user
* Improved code JS for effect and performance
### Version 1.0 (2018-03-10)
* Created the simple chat app with basic functions:
   * Sign in
   * Sign up
   * Sign out
   * Profile (the user can change display name, password, avatar, telephone number)
   * Chat main page
      * Display the current user information (display name and picture)
      * Chat in a chosen channel      
      * A user list (who is online/ offline)