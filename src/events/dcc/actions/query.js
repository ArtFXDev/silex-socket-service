// const store = require("../../../store")
const actionNamespace = require("../../../namespaces/ui/ui")

const query = (socket, io) => {
  socket.on("query", (data, callback) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }
    actionNamespace(io).emit("query", { data: data, callback: callback })
  })
}

module.exports = query
