const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")
const logger = require("../../plugins/logger")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    logger.info(" => [RECEIVED on /dcc initialization]")
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }
    data.socketID = socket.id
    // get uuid from data
    const uuid = data.uuid
    if (uuid) {
      store.instance.data.dccs[uuid] = data
      socket.data.uuid = uuid
      logger.info(`Register dcc: ${socket.data.uuid}`)
    }

    if (uuid) {
      uiRoomTo(io).emit("dccConnect", {
        data: {
          context: store.instance.data.dccs[uuid]
        }
      })
      logger.info(" <= [BROADCAST context] on /ui dccConnect")

      if (!callback) {
        return
      }
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
