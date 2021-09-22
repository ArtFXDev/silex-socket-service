const store = require('../../store')

const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    // get uid from data
    const uid = data["uid"]
    if (uid !== undefined) {
      store.dccs[uid] = data
      callback({
        status: 200 // ok
      })
    }
    else {
      callback({
        status: 500 // error
      })
    }
  })
}
module.exports = initialization