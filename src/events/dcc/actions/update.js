const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")

const update = (socket, io) => {
  socket.on("update", (data, callback) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    uiNamespace(io).emit("update", { data: data })
    if (!callback) {
      return
    }
    if (Object.keys(store.uis).length === 0) {
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
