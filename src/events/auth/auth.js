const store = require("../../store")
const axios = require("axios")

const auth = (socket) => {
  socket.on("login", (data, callback) => {
    // get token from data
    const credentials = data
    if (credentials.email && credentials.password) {
      axios.post(`${store.kitsuApi}/auth/login`, credentials)
        .then((res) => {
          if (!callback) {
            return
          }
          if (res.data.login) {
            // eslint-disable-next-line node/no-callback-literal
            callback({
              status: 200,
              msg: "Ok"
            })
            store.kitsuToken = res.access_token
          }
        })
        .catch(() => {
          if (!callback) {
            return
          }
          // eslint-disable-next-line node/no-callback-literal
          callback({
            status: 500,
            msg: "Bad credentials"
          })
        })
    } else {
      if (!callback) {
        return
      }
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500,
        msg: "Requires credentials: { email: \"myemail@mail.com\", password: \"mypassword\" }"
      })
    }
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
