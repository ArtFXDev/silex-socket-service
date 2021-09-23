/** NAMEPSACE  */
const dccNamespace = require("../namespaces/dcc/dcc")
const dccActionNamespace = require("../namespaces/dcc/action")

/** EVENTS */
const initializationEvent = require("../events/dcc/initialization")
const queryEvent = require("../events/dcc/actions/query")
const requestEvent = require("../events/dcc/actions/request")
const updateEvent = require("../events/dcc/actions/update")
const diconnectEvent = require("../events/dcc/disconnect")

/** ROOMS */
const { dccRoomJoin } = require("../rooms/dcc")

module.exports = function (io) {
  dccNamespace(io).on("connection", function (socket) {
    initializationEvent(socket, io)
    dccRoomJoin(socket)
    diconnectEvent(socket, io)
  })

  dccActionNamespace(io).on("connection", function (socket) {
    queryEvent(socket, io)
    requestEvent(socket, io)
    updateEvent(socket, io)
  })
}
