const store = require("../../store")
const { dccRoomTo } = require("../../rooms/dcc")

const disconnect = (socket, io) => {
  socket.on("initialization", (data) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    // get uid from data
    const uid = data.uid
    if (uid && store.dccs[uid]) {
      delete store.dccs[uid]
    }
    dccRoomTo(io).emit("/dcc_disconnect", { uid: uid })
  })
}
module.exports = disconnect
