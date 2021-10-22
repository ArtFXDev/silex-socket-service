const store = require("../../../store")
const logger = require("../../../plugins/logger")
const uiNamespace = require("../../../namespaces/ui/ui")

const clearAction = (socket, io) => {
  socket.on("clearAction", (data, callback) => {
    logger.info(" => [RECEIVED on /dcc/actions clearAction]")

    if (!callback || typeof callback !== "function") {
      return
    }

    store.instance.data.currentAction = undefined

    uiNamespace(io).emit("clearAction", { data: { uuid: data.uuid } })

    logger.info("currentAction cleared")

    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = clearAction
