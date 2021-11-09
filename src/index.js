// Shoul ALWAYS be first
require("./plugins/set-env")

const fs = require("fs")
const express = require("express")
const cors = require("cors")
const http = require("http")
const socketio = require("socket.io")

if (!fs.existsSync(process.env.SILEXDIR)) {
  fs.mkdirSync(process.env.SILEXDIR, { recursive: true })
}

const logger = require("./plugins/logger")
const initListeners = require("./listeners")
const authRoutes = require("./routes/auth")
const { persistStore, restoreStore } = require("./store/persistence")

// Create the express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Create the http server
const httpServer = http.createServer(app)

// Initialize socket.io on that server
const io = socketio(httpServer, {
  cors: { origins: [process.env.SILEX_FRONT_URL] }
})

/**
 * Main function, runs the server
 */
const run = async () => {
  // Restore the store if any
  restoreStore()

  // Initialize socketio event listeners
  initListeners(io)

  // Register routes
  logger.info("Registering /auth routes")
  app.use("/auth", authRoutes)

  // Start listening
  httpServer.listen(process.env.PORT, () => {
    logger.info(`listening on *:${process.env.PORT}`)
  })

  // Catch potential errors
  httpServer.on("error", (err) => {
    logger.error(`Server error: ${err}`)
  })
}

// When this module is run directly from the command line
if (require.main === module) {
  run()
}

module.exports = {
  run,
  persistStore
}
