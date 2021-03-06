const logger = require("../../utils/logger");

/**
 * /ui disconnect
 *
 * Called when a UI client is disconnected
 */
const disconnect = (socket) => {
  socket.on("disconnect", () => {
    logger.debugReceiveMessage("/ui", "disconnect", socket.data.uuid);
  });
};

module.exports = disconnect;
