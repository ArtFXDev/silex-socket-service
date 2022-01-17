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
  let updateTimer;
  let diffBuffer = undefined;
  let lastUpdateTime = 0;

  socket.on("update", (actionDiff, callback) => {
    logger.debugReceiveMessage("/dcc/action", "update", actionDiff.uuid);

    if (
      !actionDiff.uuid ||
      !store.instance.data.runningActions[actionDiff.uuid]
    ) {
      callback({ status: 400, msg: `Can't update action ${actionDiff.uuid}` });
      return;
    }

    // Apply the diff to the buffer
    diffBuffer = diffBuffer ? merge(diffBuffer, actionDiff) : actionDiff;

    const currentTime = new Date().getTime();
    logger.debug(`Update diff: ${currentTime - lastUpdateTime}ms`);
    lastUpdateTime = currentTime;

    // Reset the timer
    clearTimeout(updateTimer);

    // Schedule the update to the UI with a timeout
    // so that fast updates are batched
    updateTimer = setTimeout(() => {
      const currentAction = store.instance.data.runningActions[diffBuffer.uuid];

      // Apply the diff to the proper action
      const mergedAction = merge(currentAction, diffBuffer);

      // Save it in the store
      store.instance.data.runningActions[diffBuffer.uuid] = mergedAction;

      logger.debugSendMessage("/ui", "actionUpdate", diffBuffer.uuid);
      uiNamespace(io).emit("actionUpdate", {
        data: diffBuffer,
      });

      // Clear the buffer
      diffBuffer = undefined;
    }, parseInt(process.env.SILEX_UPDATE_THRESHOLD) || 10);

    callback({
      status: 200,
      msg: `Updated action ${actionDiff.uuid}`,
    });
  });
};

module.exports = update;
