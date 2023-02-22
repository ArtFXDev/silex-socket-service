const store = require("../../store");
const logger = require("../../utils/logger");

/**
 * /it getEnvs
 *
 * Called when the UI ask for the list of connected clients
 */
const getEnvs = (socket) => {
  socket.on("getEnvs", (callback) => {
    logger.debugReceiveMessage("/it", "getEnvs");
    logger.debugSendMessage("/it", "getEnvs");

    callback({
      status: 200, // ok
      data: { testenv: "aaaaa" }, // todo get real computer envs
    });
  });
};

module.exports = getEnvs;
