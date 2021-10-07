const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")
const merge = require("deepmerge")
const logger = require("../../../plugins/logger")

const update = (socket, io) => {
  socket.on("update", (data, callback) => {
    logger.info(" => [RECEIVED on /dcc/actions update]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    store.instance.data.currentAction = merge(
      store.instance.data.currentAction,
      data
    )
    uiNamespace(io).emit("actionUpdate", { data: store.instance.data.currentAction })
    logger.info(" <= [SEND data] to /ui update]")
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
module.exports = update
