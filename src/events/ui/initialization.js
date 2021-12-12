const logger = require("../../utils/logger");

/**
 * /ui initialization
 *
 * Called when a UI client initializes itself
 */
const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    logger.infoReceiveMessage("/ui", "initialization", data.uuid);

    if (!data.uuid) {
      callback({ status: 400, msg: "Can't initialize the UI without an uuid" });
      return;
    }

    callback({
      status: 200,
      msg: "Ok",
    });
  });
};

module.exports = initialization;
