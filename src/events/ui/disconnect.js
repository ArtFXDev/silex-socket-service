const store = require("../../store")

const disconnect = (socket, io) => {
  socket.on("disconnect", () => {
    // get uuid from data
    const uuid = socket.data.uuid
    if (uuid && store.uis[uuid]) {
      delete store.uis[uuid]
    }
  })
}
module.exports = disconnect
