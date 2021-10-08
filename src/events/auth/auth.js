const store = require("../../store")
const axios = require("axios")
const logger = require("../../plugins/logger")

const auth = (socket) => {
  socket.on("login", (data, callback) => {
    logger.info(" => [RECEIVED on /auth login]")

    // get token from data
    const credentials = data
    if (credentials.email && credentials.password) {
      axios
        .post(`${store.instance.data.kitsuApi}/auth/login`, credentials)
        .then((res) => {
          if (!callback || typeof callback !== "function") {
            return
          }
          if (res.data.login) {
            // eslint-disable-next-line node/no-callback-literal
            callback({
              status: 200,
              msg: "Ok"
            })
            store.instance.data.kitsuToken = res.data.access_token
            logger.info("Refresh kitsuToken in store from api]")
          }
        })
        .catch(() => {
          if (!callback || typeof callback !== "function") {
            return
          }
          // eslint-disable-next-line node/no-callback-literal
          callback({
            status: 500,
            msg: "Bad credentials"
          })
        })
    } else {
      if (!callback || typeof callback !== "function") {
        return
      }
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500,
        msg: 'Requires credentials: { email: "myemail@mail.com", password: "mypassword" }'
      })
    }
  })

  socket.on("token", (callback) => {
    logger.info(" => [RECEIVED on /auth token]")
    if (!callback || typeof callback !== "function") {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      msg: "Ok",
      data: store.instance.data.kitsuToken
    })
  })
}
module.exports = auth
