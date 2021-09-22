const store = require("../../store")

const getclients = (socket) => {
  socket.on("getclients", (callback) => {
    console.log(store)
    console.log(store.dccs)
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      data: store
    })
  })
}
module.exports = getclients
