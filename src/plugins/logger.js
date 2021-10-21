const pino = require("pino")
const logger= pino(
    { prettyPrint: true },
    pino.destination("./silex_socket_service.log")
)
module.exports = logger
