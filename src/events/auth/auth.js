const store = require("../../store")

const auth = (socket) => {
  socket.on("login", (data, callback) => {
    // get token from data
    const token = data.token
    if (token) {
      store.kitsuToken = token
      if (!callback) {
        return
      }
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    }
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 500,
      msg: "Token required"
    })
  })

  socket.on("token", (callback) => {
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      msg: "Ok",
      data: store.kitsuToken
    })
  })
}
module.exports = auth
