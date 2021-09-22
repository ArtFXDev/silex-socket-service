const store = require("../../../store")
const actionNamespace = require("../../../namespaces/ui/ui")

const query = (socket, io) => {
  socket.on("query", (data, callback) => {
    if (Object.keys(store.uis).length === 0) {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200,
        msg: "Empty clients !"
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200
      })
    }
    actionNamespace(io).emit("query", { data: data })
  })
}

module.exports = query
