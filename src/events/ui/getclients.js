const store = require("../../store")

const getclients = (socket) => {
  socket.on("getclients", (callback) => {
    console.log(store)
    console.log(store.dccs)
    store.name = "bbbb"
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      data: JSON.stringify(store)
    })
  })
}
module.exports = getclients
