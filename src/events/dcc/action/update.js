const store = require("../../../store");
const uiNamespace = require("../../../namespaces/ui/ui");
const logger = require("../../../plugins/logger");
const merge = require("deepmerge");

/**
 * /dcc/action - update
 *
 * Handles when a DCC sends an action update to the UI.
 * The data is sent from Python as a JSON diff. The diff is then merged with the stored action.
 */
const update = (socket, io) => {
  socket.on("update", (actionDiff, callback) => {
    const { uuid } = actionDiff;

    logger.infoReceiveMessage("/dcc/action", "update", uuid);

    // Apply the diff to the proper action
    const mergedAction = merge(
      store.instance.data.runningActions[uuid],
      actionDiff
    );

    // Save it in the store
    store.instance.data.runningActions[uuid] = mergedAction;

    // Forward the update to the UI
    logger.infoSendMessage("/ui", "actionUpdate", actionDiff.uuid);
    uiNamespace(io).emit("actionUpdate", {
      data: actionDiff,
    });

    if (!callback) {
      return;
    }

    callback({
      status: 200,
      msg: "Ok",
    });
  });
};

module.exports = update;
