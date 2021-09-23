const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")

const disconnect = (socket, io) => {
  socket.on("initialization", (data) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    // get uid from data
    const uid = data.uid
    if (uid && store.uis[uid]) {
      delete store.uis[uid]
    }
    uiRoomTo(io).emit("/ui_disconnect", { uid: uid })
  })
}
module.exports = disconnect