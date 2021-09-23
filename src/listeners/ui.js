/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")
const uiActionNamespace = require("../namespaces/ui/action")

/** EVENTS */
const initializationEvent = require("../events/ui/initialization")
const getclients = require("../events/ui/getclients")
const disconnectEvent = require("../events/ui/disconnect")

/** ROOMS */
const { uiRoomJoin } = require("../rooms/ui")

module.exports = function (io) {
  uiNamespace(io).on("connection", function (socket) {
    uiRoomJoin(socket)
    initializationEvent(socket, io)
    getclients(socket)
    disconnectEvent(socket, io)
  })
  uiActionNamespace(io).on("connection", function (socket) {
  })
}