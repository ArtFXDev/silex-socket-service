const dccActionsNamespace = require("../../namespaces/dcc/action")
const logger = require("../../plugins/logger")

const update = (socket, io) => {
  socket.on("actionUpdate", (data, callback) => {
    logger.info(" => [RECEIVED on /ui update]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    dccActionsNamespace(io).emit("update", data)
    logger.info(" <= [SEND data] to /dcc/actions update]")
    if (!callback) {
      return
    }

    if (!callback || typeof callback !== "function") {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "Empty clients !"
    })
  })
}
module.exports = update
