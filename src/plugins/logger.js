const pino = require("pino")
const path = require("path")

const logger = pino(
  { prettyPrint: true },
  process.env.NODE_ENV === "development" ? undefined : pino.destination(path.join(process.env.SILEXDIR, ".silex_desktop_log"))
)

module.exports = logger
