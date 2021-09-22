const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    // get uid from data
    const uid = data.uid
    if (uid) {
      store.uis[uid] = data
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200 // ok
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500 // error
      })
    }
    uiRoomTo(io).emit("/ui_connect", { uid: uid })
  })
}
module.exports = initialization
