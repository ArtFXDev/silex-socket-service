/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")
const uiActionNamespace = require("../namespaces/ui/action")

/** EVENTS */
const initializationEvent = require("../events/ui/initialization")
const getClients = require("../events/ui/getClients")
const disconnectEvent = require("../events/ui/disconnect")
const { persistStore, restoreStore } = require("../events/ui/persistStore")
const getCurrentActionEvent = require("../events/ui/getCurrentAction")
const ls = require("../events/ui/ls")
const submit = require("../events/ui/submit")
const update = require("../events/ui/update")

/** ROOMS */
const { uiRoomJoin } = require("../rooms/ui")

module.exports = function (io) {
  uiNamespace(io).on("connection", function (socket) {
    uiRoomJoin(socket)
    initializationEvent(socket, io)
    getClients(socket)
    disconnectEvent(socket, io)
    persistStore(socket)
    restoreStore(socket)
    ls(socket)
    getCurrentActionEvent(socket)
    submit(socket, io)
    update(socket, io)
  })

  uiActionNamespace(io).on("connection", function (socket) {
  })
}
