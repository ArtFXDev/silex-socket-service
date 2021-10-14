const logger = require("../plugins/logger")
const fs = require("fs")
const path = require("path")

module.exports = (io) => {
  // link listeners
  const listenersPath = path.resolve(__dirname)

  // reads found files
  fs.readdir(listenersPath, (err, files) => {
    if (err) {
      process.exit(1)
    }

    files.forEach((fileName) => {
      if (fileName !== "index.js") {
        logger.info("Initializing listener at: %s", fileName)

        // Requires file
        const listener = require(path.resolve(__dirname, fileName))

        // execs listener
        listener(io)
      }
    })
  })
}
