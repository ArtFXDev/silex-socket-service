const dccActionNamespace = require("../../namespaces/dcc/action");
const logger = require("../../plugins/logger");
const diff = require("../../utils/diff");
const store = require("../../store");

/**
 * /ui actionUpdate
 *
 * Called when the UI sends an action update to the dccs
 * The UI sends the whole modified action and we make the diff here
 */
const update = (socket, io) => {
  socket.on("actionUpdate", (updatedAction, callback) => {
    logger.infoReceiveMessage("/ui", "actionUpdate", updatedAction.uuid);

    if (
      !updatedAction.uuid ||
      !store.instance.data.runningActions[updatedAction.uuid]
    ) {
      callback({
        status: 400,
        msg: `Can't update action ${updatedAction.uuid}`,
      });
      return;
    }

    const currentAction =
      store.instance.data.runningActions[updatedAction.uuid];

    // Get the dcc client uuid
    const { context_metadata } = currentAction;
    const clientUuid = context_metadata.uuid;

    // Compute the diff between new action and old action
    const actionDiff = diff(currentAction, updatedAction);

    // Manually add the uuid for the python client to identify
    actionDiff.uuid = updatedAction.uuid;

    // Store the updated version
    store.instance.data.runningActions[updatedAction.uuid] = updatedAction;

    // Send that diff to the dcc
    dccActionNamespace(io).to(clientUuid).emit("update", actionDiff);

    callback({
      status: 200,
      msg: `Action ${
        store.instance.data.runningActions[updatedAction.uuid].name
      } updated!`,
    });
  });
};

module.exports = update;
