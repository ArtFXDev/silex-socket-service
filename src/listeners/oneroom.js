const connectedEvent = require("../events/connectedEvent.js")
const backendNamespace = require("../namespaces/backend")
const room1 = require("../rooms/room1")

module.exports = function(io) {
    backendNamespace(io).on("connection", function(socket) {
    room1(socket)
    connectedEvent(socket)
  })
}