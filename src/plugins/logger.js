const pino = require("pino")

const logger = pino(
  { prettyPrint: true },
  process.env.NODE_ENV === "development"
    ? undefined
    : pino.destination("./silex_socket_service.log")
)

module.exports = logger
