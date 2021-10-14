/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")
const uiActionNamespace = require("../namespaces/ui/action")

/** EVENTS */
const initializationEvent = require("../events/ui/initialization")
const getClients = require("../events/ui/getClients")
const disconnectEvent = require("../events/ui/disconnect")
const { persistStore, restoreStore } = require("../events/ui/persistStore")
const getCurrentActionEvent = require("../events/ui/getCurrentAction")
const getWorkingFilesForTask = require("../events/ui/getWorkingFilesForTask")
const launchScene = require("../events/ui/launchScene")
const submit = require("../events/ui/submit")
const update = require("../events/ui/update")
const exec = require("../events/ui/exec")

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
    getWorkingFilesForTask(socket)
    launchScene(socket)
    getCurrentActionEvent(socket)
    submit(socket, io)
    update(socket, io)
    exec(socket)
  })

  uiActionNamespace(io).on("connection", function (socket) {})
}
