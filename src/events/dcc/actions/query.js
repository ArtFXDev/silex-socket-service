const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")
const logger = require("../../../plugins/logger")

const query = (socket, io) => {
  socket.on("query", (data, callback) => {
    logger.info(" => [RECEIVED on /dcc/actions query]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    store.instance.data.currentAction = data

    uiNamespace(io).emit("query", { data: data })
    logger.info(" <= [SEND data] to /ui query")

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

module.exports = query
