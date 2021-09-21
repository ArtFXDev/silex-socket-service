const connectedEvent = require("../events/connectedEvent")
// const backendNamespace = require("../namespaces/backend")

module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.on("ebackend", function () {
      console.log("aaaaa")
      connectedEvent(socket, "connected")
    })
  })
}
