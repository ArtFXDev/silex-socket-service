const store = require("../../store")

const submit = (socket, io) => {
  socket.on("submit", (data, callback) => {
    const dccID = data.dccid
    let dcc = {}
    console.log("AAAA")
    console.log(data.dccid)
    if (dccID) {
      dcc = store.dccs[dccID]
    }
    if (!dcc) {
      return
    }
    console.log(dcc.socketID)
    io.to(dcc.socketID).emit("submit", data)
    io.to(dcc.socketID).emit("submit", data)
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
