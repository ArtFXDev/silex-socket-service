const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    // get uid from data
    const uid = data.uid
    if (uid) {
      store.uis[uid] = data
    }
    if (!callback) {
      return
    }
    if (uid) {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500, // error
        msg: "Missing uid in data."
      })
    }
    uiRoomTo(io).emit("/ui_connect", { uid: uid })
  })
}
module.exports = initialization
