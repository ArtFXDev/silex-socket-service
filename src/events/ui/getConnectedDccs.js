const store = require("../../store");
const logger = require("../../plugins/logger");

/**
 * /ui getConnectedDccs
 *
 * Called when the UI ask for the list of connected clients
 */
const getConnectedDccs = (socket) => {
  socket.on("getConnectedDccs", (callback) => {
    logger.infoReceiveMessage("/ui", "getConnectedDccs");

    logger.infoSendMessage("/ui", "getConnectedDccs");
    callback({
      status: 200, // ok
      data: store.instance.data.dccs,
    });
  });
};

module.exports = getConnectedDccs;
