const store = require("../../store")
const logger = require("../../plugins/logger")

const getClients = (socket) => {
  socket.on("getClients", (callback) => {
    logger.info(` => [RECEIVED on /ui getCLients] socketID: ${socket.data.uuid}`)
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      data: store.instance.data.dccs
    })
  })
}
module.exports = getClients
