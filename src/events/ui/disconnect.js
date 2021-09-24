const store = require("../../store")

const disconnect = (socket, io) => {
  socket.on("disconnect", (data) => {
    // get uuid from data
    const uuid = data.uuid
    if (uuid && store.uis[uuid]) {
      delete store.uis[uuid]
    }
  })
}
module.exports = disconnect
