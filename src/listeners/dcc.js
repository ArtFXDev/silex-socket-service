/** NAMEPSACE  */
const dccNamespace = require("../namespaces/dcc/dcc")
const dccActionsNamespace = require("../namespaces/dcc/actions")

/** EVENTS */
const initializationEvent = require("../events/dcc/initialization")
const queryEvent = require("../events/dcc/actions/query")
const requestEvent = require("../events/dcc/actions/request")
const updateEvent = require("../events/dcc/actions/update")

/** ROOMS */
const { dccRoomJoin } = require("../rooms/dccRoom")
module.exports = function (io) {
  dccNamespace(io).on("connection", function (socket) {
    initializationEvent(socket)
    dccRoomJoin(socket)
  })

  dccActionsNamespace(io).on("connection", function (socket) {
    queryEvent(socket)
    requestEvent(socket)
    updateEvent(socket)
  })
}
