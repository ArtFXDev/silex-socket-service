const store = require("../../../store")
const clearCurrentAction = (socket, io) => {
  socket.on("query", (callback) => {
    if (!callback) {
      return
    }
    store.instance.data.currentAction = ""
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = clearCurrentAction
