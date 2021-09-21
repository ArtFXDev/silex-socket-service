const dccEvent = require("../events/dccEvent")
const dccNamespace = require("../namespaces/dcc")
const { dccRoomJoin } = require("../rooms/dccRoom")

module.exports = function (io) {
  dccNamespace(io).on("connection", function (socket) {
    socket.on("edcc", function () {
      dccRoomJoin(socket)
      console.log("aaaaa")
      dccEvent(dccNamespace(io))
    })
  })
}
