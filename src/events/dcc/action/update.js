const store = require("../../../store");
const uiNamespace = require("../../../namespaces/ui/ui");
const logger = require("../../../utils/logger");
const merge = require("../../../utils/merge");

/**
 * /dcc/action - update
 *
 * Handles when a DCC sends an action update to the UI.
 * The data is sent from Python as a JSON diff. The diff is then merged with the stored action.
 */
const update = (socket, io) => {
  socket.on("update", (actionDiff, callback) => {
    logger.infoReceiveMessage("/dcc/action", "update", actionDiff.uuid);

    if (
      !actionDiff.uuid ||
      !store.instance.data.runningActions[actionDiff.uuid]
    ) {
      callback({ status: 400, msg: `Can't update action ${actionDiff.uuid}` });
      return;
    }

    const currentAction = store.instance.data.runningActions[actionDiff.uuid];

    // Apply the diff to the proper action
    const mergedAction = merge(currentAction, actionDiff);

    // Save it in the store
    store.instance.data.runningActions[actionDiff.uuid] = mergedAction;

    // Forward the update to the UI
    logger.infoSendMessage("/ui", "actionUpdate", actionDiff.uuid);
    uiNamespace(io).emit("actionUpdate", {
      data: actionDiff,
    });

    callback({
      status: 200,
      msg: `Updated action ${actionDiff.uuid}`,
    });
  });
};

module.exports = update;
