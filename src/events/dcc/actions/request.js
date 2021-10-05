const store = require("../../../store")
const uiNamespace = require("../../../namespaces/ui/ui")

const request = (socket, io) => {
  socket.on("request", (data, callback) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    uiNamespace(io).emit("request", { data: data })
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
