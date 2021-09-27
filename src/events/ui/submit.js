const store = require("../../store")

const submit = (socket, io) => {
  socket.on("submit", (data, callback) => {
    const dccID = data.dccid
    let dcc = {}

    if (dccID) {
      dcc = store.dccs[dccID]
    }
    if (!callback || !dcc) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      msg: "Ok"
    })
    io.sockets.socket(dcc.socketID).emit(data)
  })
}
module.exports = submit
