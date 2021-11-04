const pino = require("pino")

const logger = pino(
  { prettyPrint: true },
  process.env.NODE_ENV === "development" ? undefined : pino.destination(process.env.SILEXDIR)
)

module.exports = logger
