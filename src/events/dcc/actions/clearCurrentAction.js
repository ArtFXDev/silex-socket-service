const store = require("../../../store")
const logger = require("../../../plugins/logger")

const clearCurrentAction = (socket) => {
  socket.on("clearCurrentAction", (callback) => {
    logger.info(" => [RECEIVED on /dcc/actions clearCurrentAction]")
    if (!callback || typeof callback !== "function") {
      return
    }
    store.instance.data.currentAction = undefined
    logger.info("currentAction cleared")
    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = clearCurrentAction
