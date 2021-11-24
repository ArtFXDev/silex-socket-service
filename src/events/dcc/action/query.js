const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")
const logger = require("../../../plugins/logger")

/**
 * /dcc/action query
 *
 * Handles when a new action is sent from the dcc to UIs
 */
const query = (socket, io) => {
  socket.on("query", (newAction, callback) => {
    logger.infoReceiveMessage("/dcc/action", "query", `${newAction.uuid}`)

    // Storing the action in a dict
    store.instance.data.runningActions[newAction.uuid] = newAction

    // Send that action to the UI
    logger.infoSendMessage("/ui", "actionQuery", newAction.uuid)
    uiNamespace(io).emit("actionQuery", { data: newAction })

    callback({
      status: 200,
      msg: "Ok"
    })
  })
}

module.exports = query
