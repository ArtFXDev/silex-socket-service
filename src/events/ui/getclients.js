const store = require("../../store")

const getClients = (socket) => {
  socket.on("getClients", (callback) => {
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      data: store.instance.data.dccs
    })
  })
}
module.exports = getClients
