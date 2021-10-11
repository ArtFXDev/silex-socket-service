const store = require("../../store")
const logger = require("../../plugins/logger")

const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    logger.info(" => [RECEIVED on /ui initialization]")

    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    // get uuid from data
    const uuid = data.uuid
    if (uuid) {
      store.instance.data.uis[uuid] = data
      socket.data.uuid = uuid
      logger.info(`Register socketClient: ${socket.data.uuid}`)
    }
    if (!callback) {
      return
    }
    if (uuid) {
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } else {
      callback({
        status: 500, // error
        msg: "Missing uuid in data."
      })
    }
  })
}
module.exports = initialization
