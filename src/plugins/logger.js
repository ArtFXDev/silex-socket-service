const pino = require("pino")
const path = require("path")
const fs = require("fs")

// Creates the log dir if doesn't exist
// Runs only once because node caches requires
if (!fs.existsSync(process.env.SILEX_LOG_DIR)) {
  fs.mkdirSync(process.env.SILEX_LOG_DIR, { recursive: true })
}

// The main logger
const logger = pino(
  {
    prettyPrint: true,
    colorize: process.env.NODE_ENV === "development",
    translateTime: true // Put real time instead of timestamp
  },
  // Only log to a file when in production
  process.env.NODE_ENV === "development"
    ? undefined
    : path.join(process.env.SILEX_LOG_DIR, ".silex_socket_service_log")
)

/**
 * Logging a message when sending or receiving a socket message
 */
logger.infoNetworkMessage = (send, route, message, content) => {
  let str = `${send ? "<-" : "->"} [${route}${message ? " - " + message : ""}]`
  if (content)
    str = `${str}: ${
      typeof content === "string" ? content : JSON.stringify(content)
    }`
  logger.info(str)
}

/**
 * Receiving a message
 */
logger.infoReceiveMessage = (route, message, content) => {
  logger.infoNetworkMessage(false, route, message, content)
}

/**
 * Sending a message
 */
logger.infoSendMessage = (route, message, content) => {
  logger.infoNetworkMessage(true, route, message, content)
}

/**
 * Receiving or sending a HTTP message
 */
logger.infoHTTPMessage = (method, route) => {
  logger.infoNetworkMessage(false, `${method} ${route}`)
}

module.exports = logger
