const dccActionNamespace = require("../../namespaces/dcc/action");
const logger = require("../../utils/logger");
const store = require("../../store");
const merge = require("../../utils/merge");

/**
 * /ui actionUpdate
 *
 * Called when the UI sends an action update to the dccs
 * The UI sends the whole modified action and we make the diff here
 */
const update = (socket, io) => {
  socket.on("actionUpdate", (actionDiff, callback) => {
    logger.debugReceiveMessage("/ui", "actionUpdate", actionDiff.uuid);

    if (
      !actionDiff.uuid ||
      !store.instance.data.runningActions[actionDiff.uuid]
    ) {
      callback({
        status: 400,
        msg: `Can't update action ${actionDiff.uuid}`,
      });
      return;
    }

    const currentAction = store.instance.data.runningActions[actionDiff.uuid];

    // Apply the diff to the proper action
    const mergedAction = merge(currentAction, actionDiff);

    // Store the updated version
    store.instance.data.runningActions[actionDiff.uuid] = mergedAction;

    // Get the dcc client uuid
    const clientUuid = currentAction.context_metadata.uuid;

    // Send that diff to the dcc
    dccActionNamespace(io).to(clientUuid).emit("update", actionDiff);

    callback({
      status: 200,
      msg: `Action ${
        store.instance.data.runningActions[actionDiff.uuid].name
      } updated!`,
    });
  });
};

module.exports = update;
