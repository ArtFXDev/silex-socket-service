const store = require("../../store");
const logger = require("../../utils/logger");

/**
 * /ui getRunningActions
 *
 * Used by the UI to fetch the currently running actions
 */
const getRunningActions = (socket) => {
  socket.on("getRunningActions", (callback) => {
    logger.debugReceiveMessage("/ui", "getRunningActions");
    logger.debugSendMessage("/ui", "getRunningActions");

    // Send the stored actions to the UI
    callback({
      status: 200,
      msg: "ok",
      data: store.instance.data.runningActions,
    });
  });
};

module.exports = getRunningActions;
