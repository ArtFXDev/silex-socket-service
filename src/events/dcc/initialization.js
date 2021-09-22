const store = require("../../store")

const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    // get uid from data
    const uid = data.uid
    if (uid !== undefined) {
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
  })
}
module.exports = initialization
