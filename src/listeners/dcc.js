// Namespaces
const dccNamespace = require("../namespaces/dcc/dcc");
const dccActionNamespace = require("../namespaces/dcc/action");

// Events
const initializationDccEvent = require("../events/dcc/initialization");
const initializationDccActionEvent = require("../events/dcc/action/initialization");
const queryEvent = require("../events/dcc/action/query");
const updateEvent = require("../events/dcc/action/update");
const diconnectEvent = require("../events/dcc/disconnect");
const clearAction = require("../events/dcc/action/clearAction");
const runningActions = require("../events/dcc/action/runningActions");

// Rooms
const { dccRoomJoin } = require("../rooms/dcc");

module.exports = function (io) {
  // Register /dcc listeners
  dccNamespace(io).on("connection", function (socket) {
    // Join the dcc room
    dccRoomJoin(socket);

    initializationDccEvent(socket, io);
    diconnectEvent(socket, io);
  });

  // Register /dcc/action listeners
  dccActionNamespace(io).on("connection", function (socket) {
    initializationDccActionEvent(socket);
    runningActions(socket);
    queryEvent(socket, io);
    updateEvent(socket, io);
    clearAction(socket, io);
  });
};
