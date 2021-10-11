const store = require("../../store")
const logger = require("../../plugins/logger")

const getClients = (socket) => {
  socket.on("getClients", (callback) => {
    logger.info(
      ` => [RECEIVED on /ui getCLients] socketID: ${socket.data.uuid}`
    )
    if (!callback) {
      return
    }
    })
  })
}
module.exports = getClients
