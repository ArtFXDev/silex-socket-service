const logger = require("../../../plugins/logger")

/**
 * /dcc/action initialization
 *
 * Same as /dcc initialization but useful for joining a specific room with its uuid
 */
const initialization = (socket) => {
  socket.on("initialization", (dccContext, callback) => {
    logger.infoReceiveMessage("/dcc/action", "initialization", dccContext.uuid)

    // Make the socket join a room with its id
    socket.join(dccContext.uuid)

    callback({
      status: 200, // ok
      msg: "Ok"
    })
  })
}

module.exports = initialization
