const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")

const disconnect = (socket, io) => {
  socket.on("disconnect", (data) => {
    // get uuid from data
    const uuid = data.uuid
    if (uuid && store.dccs[uuid]) {
      delete store.dccs[uuid]
    }
    uiRoomTo(io).emit("dccDisconnect", { uuid: socket.data.uuid })
  })
}
module.exports = disconnect
