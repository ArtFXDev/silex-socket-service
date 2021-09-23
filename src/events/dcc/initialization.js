const store = require("../../store")
const { dccRoomTo } = require("../../rooms/dcc")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    // get uid from data
    const uid = data.uid
    if (uid) {
      store.dccs[uid] = data
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
    dccRoomTo(io).emit("/dcc_connect", { uid: uid })
  })
}
module.exports = initialization
