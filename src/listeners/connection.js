const connectedEvent = require("../events/connectedEvent.js")

module.exports = function(io) {
  io.on("connection", function(socket) {
    connectedEvent(socket, "connected")
  });
};