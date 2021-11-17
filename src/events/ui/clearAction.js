const dccActionsNamespace = require("../../namespaces/dcc/action")
const logger = require("../../plugins/logger")

const clearAction = (socket, io) => {
  socket.on("clearAction", (data, callback) => {
    logger.info(" => [RECEIVED on /ui clearAction]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    dccActionsNamespace(io).emit("clear", data)
    logger.info(" <= [SEND data] to /dcc/actions clearAction]")

    if (!callback) {
      return
    }

    callback({
      status: 200,
      msg: "Action cleared"
    })
  })
}
module.exports = clearAction
