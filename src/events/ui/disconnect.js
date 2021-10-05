const store = require("../../store")

const disconnect = (socket) => {
  socket.on("disconnect", () => {
    // get uuid from data
    const uuid = socket.data.uuid
    if (uuid && store.instance.data.uis[uuid]) {
      delete store.instance.data.uis[uuid]
    }
  })
}
module.exports = disconnect
