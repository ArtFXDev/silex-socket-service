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

    uiNamespace(io).emit("actionQuery", { data: data })
    logger.info(" <= [SEND data] to /ui actionQuery")

    if (!callback) {
      return
    }

    if (Object.keys(store.instance.data.uis).length === 0) {
      callback({
        status: 200,
        msg: "Empty clients !"
      })
    } else {
      callback({
        status: 200,
        msg: "Ok"
      })
    }
  })
}

module.exports = query
