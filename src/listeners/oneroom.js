const connectedEvent = require("../events/connectedEvent.js")
const backendNamespace = require("../namespaces/backend")

module.exports = function(io) {
    backendNamespace(io).on("connection", function(socket) {
    connectedEvent(socket)
  })
}