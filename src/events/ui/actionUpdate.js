const dccActionNamespace = require("../../namespaces/dcc/action");
const logger = require("../../plugins/logger");
const { diff } = require("deep-object-diff");
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

    // Get the dcc client uuid
    const { context_metadata } =
      store.instance.data.runningActions[updatedAction.uuid];
    const clientUuid = context_metadata.uuid;

    // Compute the diff between new action and old action
    const actionDiff = diff(
      store.instance.data.runningActions[updatedAction.uuid],
      updatedAction
    );

    // Manually add the uuid for the backend to identify
    actionDiff.uuid = updatedAction.uuid;

    // Send that diff to the dcc
    dccActionNamespace(io).to(clientUuid).emit("update", actionDiff);

    callback({
      status: 200,
      msg: "Empty clients !",
    });
  });
};

module.exports = update;
