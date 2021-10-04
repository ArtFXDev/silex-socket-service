const store = require("../../../store")

const getCurrentAction = (socket, io) => {
  socket.on("query", (data, callback) => {
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200,
      msg: "ok",
      data: store.currentAction
    })
  })
}

module.exports = getCurrentAction
