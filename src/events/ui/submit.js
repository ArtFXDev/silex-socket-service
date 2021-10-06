const store = require("../../store")
const dccNamespace = require("../../namespaces/dcc/dcc")
const logger = require("../../plugins/logger")

const submit = (socket, io) => {
  socket.on("submit", (data, callback) => {
    logger.info(" => [RECEIVED on /ui submit]")
    const uuid = data.data.uuid
    let dcc = {}
    if (uuid) {
      dcc = store.instance.data.dccs[uuid]
    }

    if (!dcc) {
      return
    }

    dccNamespace(io).to(dcc.socketID).emit("submit", data)
    logger.info(` <= [SEND data] to /dcc ${dcc.socketID}`)
    if (!callback) {
      return
    }
    // eslint-disable-next-line node/no-callback-literal
    callback({
      status: 200, // ok
      msg: "Ok"
    })
  })
}
module.exports = submit
