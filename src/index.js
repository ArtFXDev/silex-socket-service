const initListeners = require("./listeners")
const app = require("express")()
const http = require("http").createServer(app)
const logger = require("./plugins/logger")

const io = require("socket.io")(http, {
  cors: { origins: ["http://localhost:3000"] }
})

const run = async () => {
  // calls listeners
  initListeners(io)

  http.listen(5118, function () {
    logger.info("listening on *:5118")
  })
}

if (require.main === module) {
  run()
}

module.exports = {
  run
}
