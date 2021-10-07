const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")
const logger = require("../../../plugins/logger")

const request = (socket, io) => {
  socket.on("request", (data, callback) => {
    logger.info(" => [RECEIVED on /dcc/actions request]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    uiNamespace(io).emit("actionRequest", { data: data })
    logger.info(" <= [SEND data] to /ui request")

    if (!callback) {
      return
    }

    if (Object.keys(store.instance.data.uis).length === 0) {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200,
        msg: "Empty clients !"
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200,
        msg: "Ok"
      })
    }
  })
}
module.exports = request
