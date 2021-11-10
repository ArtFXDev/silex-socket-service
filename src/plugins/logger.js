const pino = require("pino")
const path = require("path")
const fs = require("fs")

// Creates the log dir if doesn't exist
// Runs only once because node caches requires
if (!fs.existsSync(process.env.SILEX_LOG_DIR)) {
  fs.mkdirSync(process.env.SILEX_LOG_DIR, { recursive: true })
}

const transport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: process.env.NODE_ENV === "development",
    translateTime: true,
    destination:
      process.env.NODE_ENV === "development"
        ? undefined
        : path.join(process.env.SILEX_LOG_DIR, ".silex_socket_service_log")
  }
})

const logger = pino(transport)

module.exports = logger
