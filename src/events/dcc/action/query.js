const store = require("../../../store");
const uiNamespace = require("../../../namespaces/ui/ui");
const logger = require("../../../utils/logger");

/**
 * /dcc/action query
 *
 * Handles when a new action is sent from the dcc to UIs
 */
const query = (socket, io) => {
  socket.on("query", (newAction, callback) => {
    logger.infoReceiveMessage("/dcc/action", "query", `${newAction.uuid}`);

    if (!newAction.uuid) {
      callback({ status: 400, msg: "The action needs to have an uuid" });
      return;
    }

    if (!newAction.context_metadata || !newAction.context_metadata.uuid) {
      callback({
        status: 400,
        msg: "The action needs to have a context associated to it",
      });
      return;
    }

    // Storing the action in a dict
    store.instance.data.runningActions[newAction.uuid] = newAction;

    // Send that action to the UI
    logger.infoSendMessage("/ui", "actionQuery", newAction.uuid);
    uiNamespace(io).emit("actionQuery", { data: newAction });

    callback({
      status: 200,
      msg: `Action ${newAction.uuid} stored`,
    });
  });
};

module.exports = query;
