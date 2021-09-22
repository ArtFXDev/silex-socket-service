const store = require("../../store")

const getclients = (socket) => {
  socket.on("getclients", (callback) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      data: store.dccs
    })
  })
}
module.exports = getclients
