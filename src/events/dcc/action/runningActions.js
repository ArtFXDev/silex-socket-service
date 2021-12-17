const logger = require("../../../utils/logger");

/**
 * /dcc/action runningActions
 *
 * Sent by a running silex_client instance at connection, we receive the running actions
 */
const runningActions = (socket) => {
  socket.on("runningActions", (runningActions, callback) => {
    logger.debugReceiveMessage("/dcc/action", "runningActions");

    console.log(runningActions);

    callback({
      status: 200,
    });
  });
};

module.exports = runningActions;
