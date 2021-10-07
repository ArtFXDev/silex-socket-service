const store = require("../../../store")
const logger = require("../../../plugins/logger")

const clearCurrentAction = (socket, io) => {
  socket.on("clearCurrentAction", (callback) => {
    logger.info(" => [RECEIVED on /dcc/actions clearCurrentAction]")
    if (!callback) {
      return
    }
    store.instance.data.currentAction = ""
    logger.info("currentAction cleared")
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = clearCurrentAction
