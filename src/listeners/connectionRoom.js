const dccEvent = require("../events/dccEvent")
const dccNamespace = require("../namespaces/dcc")
const { dccRoomJoin } = require("../rooms/dccRoom")

module.exports = function (io) {
  dccNamespace(io).on("aa", function (socket) {
    console.log("receive")
    dccRoomJoin(socket)
    dccEvent(dccNamespace(io))
  })
}
