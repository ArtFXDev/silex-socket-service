const store = require("../../store")
const logger = require("../../plugins/logger")

const getCurrentAction = (socket) => {
  socket.on("getCurrentAction", (callback) => {
    logger.info(` => [RECEIVED on /ui getCLients] socketID: ${socket.data.uuid}`)
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "ok",
      data: store.instance.data.currentAction
    })
  })
}

module.exports = getCurrentAction
