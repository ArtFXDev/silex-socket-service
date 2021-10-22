/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")

/** EVENTS */
const initializationEvent = require("../events/ui/initialization")
const getClients = require("../events/ui/getClients")
const disconnectEvent = require("../events/ui/disconnect")
const getCurrentActionEvent = require("../events/ui/getCurrentAction")
const getWorkingFilesForTask = require("../events/ui/getWorkingFilesForTask")
const launchAction = require("../events/ui/launchAction")
const launchScene = require("../events/ui/launchScene")
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
    getWorkingFilesForTask(socket)
    launchAction(socket)
    launchScene(socket)
    getCurrentActionEvent(socket)
    submit(socket, io)
    update(socket, io)
  })
}
