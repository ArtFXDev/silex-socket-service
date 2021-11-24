const logger = require("../../plugins/logger");

/**
 * /ui initialization
 *
 * Called when a UI client initializes itself
 */
const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    logger.infoReceiveMessage("/ui", "initialization", socket.id);

    callback({
      status: 200,
      msg: "Ok",
    });
  });
};

module.exports = initialization;
