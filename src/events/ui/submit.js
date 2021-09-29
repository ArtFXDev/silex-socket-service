const store = require("../../store")
const dccNamespace = require("../../namespaces/dcc/dcc")
const submit = (socket, io) => {
  socket.on("submit", (data, callback) => {
    const uuid = data.data.uuid
    let dcc = {}
    if (uuid) {
      dcc = store.dccs[uuid]
    }
    if (!dcc) {
      return
    }
    dccNamespace(io).to(dcc.socketID).emit("submit", data)
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      msg: "Ok"
    })
  })
}
module.exports = submit
