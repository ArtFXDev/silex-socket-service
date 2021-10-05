const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")

const disconnect = (socket, io) => {
  socket.on("disconnect", () => {
    // get uuid from data
    const uuid = socket.data.uuid
    if (uuid && store.instance.data.dccs[uuid]) {
      delete store.instance.data.dccs[uuid]
    }
    uiRoomTo(io).emit("dccDisconnect", { uuid: socket.data.uuid })
  })
}
module.exports = disconnect
