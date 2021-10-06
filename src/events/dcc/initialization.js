const store = require("../../store")
const { uiRoomTo } = require("../../rooms/ui")
const logger = require("../../plugins/logger")

const initialization = (socket, io) => {
  socket.on("initialization", (data, callback) => {
    logger.info(` => [RECEIVED on initilization] ${socket.data.uuid}`)
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }
    data.socketID = socket.id
    // get uuid from data
    const uuid = data.uuid
    if (uuid) {
      store.instance.data.dccs[uuid] = data
      socket.data.uuid = uuid
    }

    if (uuid) {
      uiRoomTo(io).emit("dccConnect", { context: store.instance.data.dccs[uuid] })
      if (!callback) {
        return
      }
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500, // error
        msg: "Missing uuid in data."
      })
    }
  })
}
module.exports = initialization
