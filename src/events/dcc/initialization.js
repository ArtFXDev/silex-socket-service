const store = require("../../store")
const { dccRoomTo } = require("../../rooms/dcc")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    // get uid from data
    const uid = data.uid
    if (uid) {
      store.dccs[uid] = data

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
    dccRoomTo(io).emit("/dcc_connect", { uid: uid })
  })
}
module.exports = initialization
