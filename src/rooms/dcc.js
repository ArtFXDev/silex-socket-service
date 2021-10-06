const dccNamespace = require("../namespaces/dcc/dcc")
const logger = require("../plugins/logger")

const dccRoomJoin = (socket) => {
  logger.info(`socketID: ${socket.data.uuid ? socket.data.uuid : "unregistered"} join dcc Room`)
  return socket.join("dccRoom")
}

const dccRoomTo = (io) => {
  return dccNamespace(io).to("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
