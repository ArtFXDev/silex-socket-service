const uiNamespace = require("../namespaces/ui/ui")
const logger = require("../plugins/logger")

const uiRoomJoin = (socket) => {
  logger.info(
    `socketID: ${
      socket.data.uuid ? socket.data.uuid : "unregister"
    } join ui Room`
  )
  return socket.join("uiRoom")
}

const uiRoomTo = (io) => {
  return uiNamespace(io).to("uiRoom")
}

module.exports = { uiRoomJoin, uiRoomTo }
