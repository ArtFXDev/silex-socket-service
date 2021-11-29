const store = require("../../../store");
const logger = require("../../../plugins/logger");
const uiNamespace = require("../../../namespaces/ui/ui");

/**
 * /dcc/action clearAction
 *
 * Handles when an action is cleared.
 * The Python client sends this to indicate that an action is over
 */
const clearAction = (socket, io) => {
  socket.on("clearAction", (data, callback) => {
    logger.infoReceiveMessage("/dcc/action", "clearAction", `${data.uuid}`);

    if (!data.uuid || !store.instance.data.runningActions[data.uuid]) {
      callback({
        status: 400,
        msg: `Action ${data.uuid} does not exist in the store`,
      });
      return;
    }

    // Delete the action from the store
    delete store.instance.data.runningActions[data.uuid];

    // Forward the request to the UI
    logger.infoSendMessage("/ui", "clearAction", data.uuid);
    uiNamespace(io).emit("clearAction", { data });

    callback({
      status: 200,
      msg: `Action ${data.uuid} cleared`,
    });
  });
};

module.exports = clearAction;
