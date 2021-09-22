/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")

/** EVENTS */
const initializationEvent = require("../events/ui/initialization")
const getclients = require("../events/ui/getclients")

/** ROOMS */
const { uiRoomJoin } = require("../rooms/ui")

module.exports = function (io) {
  uiNamespace(io).on("connection", function (socket) {
    uiRoomJoin(socket)
    initializationEvent(socket)
    getclients(socket)
  })
}
