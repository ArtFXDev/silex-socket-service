// Namespaces
const uiNamespace = require("../namespaces/ui/ui");

// Events
const initializationEvent = require("../events/ui/initialization");
const getConnectedDccs = require("../events/ui/getConnectedDccs");
const disconnectEvent = require("../events/ui/disconnect");
const getRunningActions = require("../events/ui/getRunningActions");
const searchDirRecursive = require("../events/ui/searchDirRecursive");
const launchAction = require("../events/ui/launchAction");
const launchScene = require("../events/ui/launchScene");
const actionUpdate = require("../events/ui/actionUpdate");
const clearAction = require("../events/ui/clearAction");
const pullPublishedScene = require("../events/ui/pullPublishedScene");
const readDir = require("../events/ui/readDir");
const killProcess = require("../events/ui/killProcess");
const copyFile = require("../events/ui/copyFile");

// Rooms
const { uiRoomJoin } = require("../rooms/ui");

module.exports = function (io) {
  // Register /ui listeners
  uiNamespace(io).on("connection", function (socket) {
    uiRoomJoin(socket);
    getConnectedDccs(socket);
    searchDirRecursive(socket);
    readDir(socket);
    pullPublishedScene(socket);
    launchAction(socket);
    launchScene(socket);
    getRunningActions(socket);
    killProcess(socket);
    copyFile(socket);

    initializationEvent(socket, io);
    disconnectEvent(socket, io);
    actionUpdate(socket, io);
    clearAction(socket, io);
  });
};
