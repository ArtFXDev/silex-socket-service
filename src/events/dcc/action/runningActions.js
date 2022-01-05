const logger = require("../../../utils/logger");
const store = require("../../../store");

/**
 * /dcc/action runningActions
 *
 * Sent by a running silex_client instance at connection, we receive the running actions
 */
const runningActions = (socket) => {
  socket.on("runningActions", (runningActions, callback) => {
    logger.debugReceiveMessage("/dcc/action", "runningActions");

    // Merge both actions dicts
    store.instance.data.runningActions = {
      ...store.instance.data.runningActions,
      ...runningActions,
    };

    callback({
      status: 200,
    });
  });
};

module.exports = runningActions;
