// Read the .env file
require("dotenv-safe").config()

const initListeners = require("./listeners")
const app = require("express")()
const http = require("http").createServer(app)
const logger = require("./plugins/logger")

const io = require("socket.io")(http, {
  cors: { origins: [process.env.SILEX_FRONT_URL] }
})

const run = async () => {
  // calls listeners
  initListeners(io)

  http.listen(process.env.PORT, function () {
    logger.info(`listening on *:${process.env.PORT}`)
  })
}

if (require.main === module) {
  run()
}

module.exports = {
  run
}
