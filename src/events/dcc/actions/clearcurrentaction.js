const store = require("../../../store")

const clearCurrentAction = (socket, io) => {
  socket.on("query", (data, callback) => {
    if (!callback) {
      return
    }
    store.currentAction = ""
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = clearCurrentAction
