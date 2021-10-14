const store = require("../../store")
const logger = require("../../plugins/logger")

const getCurrentAction = (socket) => {
  socket.on("getCurrentAction", (callback) => {
    logger.info(
      ` => [RECEIVED on /ui getCurrentAction] socketID: ${socket.data.uuid}`
    )
    if (!callback) {
      return
    }
    callback({
      status: 200,
      msg: "ok",
      data: store.instance.data.currentAction
    })
  })
}

module.exports = getCurrentAction
