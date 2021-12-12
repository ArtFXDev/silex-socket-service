const store = require("../../store");
const logger = require("../../utils/logger");

/**
 * /ui getConnectedDccs
 *
 * Called when the UI ask for the list of connected clients
 */
const getConnectedDccs = (socket) => {
  socket.on("getConnectedDccs", (callback) => {
    logger.debugReceiveMessage("/ui", "getConnectedDccs");

    logger.debugSendMessage("/ui", "getConnectedDccs");
    callback({
      status: 200, // ok
      data: store.instance.data.dccs,
    });
  });
};

module.exports = getConnectedDccs;
