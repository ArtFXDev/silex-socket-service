// Namespaces
const uiNamespace = require("../namespaces/ui/ui");

// Events
const initializationEvent = require("../events/ui/initialization");
const getConnectedDccs = require("../events/ui/getConnectedDccs");
const disconnectEvent = require("../events/ui/disconnect");
const getRunningActions = require("../events/ui/getRunningActions");
const getWorkingFilesForTask = require("../events/ui/getWorkingFilesForTask");
const launchAction = require("../events/ui/launchAction");
const launchScene = require("../events/ui/launchScene");
const actionUpdate = require("../events/ui/actionUpdate");
const clearAction = require("../events/ui/clearAction");

// Rooms
const { uiRoomJoin } = require("../rooms/ui");

module.exports = function (io) {
  // Register /ui listeners
  uiNamespace(io).on("connection", function (socket) {
    uiRoomJoin(socket);
    initializationEvent(socket, io);
    getConnectedDccs(socket);
    disconnectEvent(socket, io);
    getWorkingFilesForTask(socket);
    launchAction(socket);
    launchScene(socket);
    getRunningActions(socket);
    actionUpdate(socket, io);
    clearAction(socket, io);
  });
};
