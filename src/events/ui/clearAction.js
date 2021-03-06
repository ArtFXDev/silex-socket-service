const store = require("../../store");
const dccActionNamespace = require("../../namespaces/dcc/action");
const logger = require("../../utils/logger");

/**
 * /ui clearAction
 *
 * Sent by the UI to clear a specific running action
 */
const clearAction = (socket, io) => {
  socket.on("clearAction", (data, callback) => {
    logger.debugReceiveMessage("/ui", "clearAction", `${data.uuid}`);

    if (!data.uuid || !store.instance.data.runningActions[data.uuid]) {
      callback({ status: 400, msg: `Can't clear action ${data.uuid}` });
      return;
    }

    // Get the dcc client uuid
    const { context_metadata } = store.instance.data.runningActions[data.uuid];
    const clientUuid = context_metadata.uuid;

    // Clear the action in the store
    delete store.instance.data.runningActions[data.uuid];

    // Forward the message to the dcc using its uuid
    logger.debugSendMessage(
      "/dcc/action",
      "clear",
      `Sent to dcc: ${data.uuid}`
    );
    dccActionNamespace(io).to(clientUuid).emit("clear", data);

    callback({
      status: 200,
      msg: "Action cleared",
    });
  });
};

module.exports = clearAction;
