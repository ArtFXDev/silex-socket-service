const store = require("../../store")

const submit = (socket, io) => {
  socket.on("submit", (data, callback) => {
    const uuid = data.uuid
    let dcc = {}
    console.log("AAAA")
    console.log(data.uuid)
    if (uuid) {
      dcc = store.dccs[uuid]
    }
    if (!dcc) {
      return
    }
    io.of("/dcc").to(dcc.socketID).emit("submit", data)
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
