const logger = require("../../../utils/logger");

/**
 * /dcc/action initialization
 *
 * Same as /dcc initialization but useful for joining a specific room with its uuid
 */
const initialization = (socket) => {
  socket.on("initialization", (dccContext, callback) => {
    logger.infoReceiveMessage("/dcc/action", "initialization", dccContext.uuid);

    if (!dccContext.uuid) {
      callback({
        status: 400,
        msg: "The context needs to have an uuid in order to join the room",
      });
      return;
    }

    // Make the socket join a room with its uuid
    socket.join(dccContext.uuid);

    callback({
      status: 200, // ok
      msg: `Client ${dccContext.uuid} initialized`,
    });
  });
};

module.exports = initialization;
