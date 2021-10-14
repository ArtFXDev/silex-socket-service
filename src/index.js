// Read the .env file
require("dotenv-safe").config()

const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const http = require("http").createServer(app)

const logger = require("./plugins/logger")
const initListeners = require("./listeners")
const authRoutes = require("./routes/auth")

const io = require("socket.io")(http, {
  cors: { origins: [process.env.SILEX_FRONT_URL] }
})

const run = async () => {
  // calls listeners
  initListeners(io)

  logger.info("Registering /auth routes")
  app.use("/auth", authRoutes)

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
