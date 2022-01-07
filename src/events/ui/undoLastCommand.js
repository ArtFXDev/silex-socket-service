const store = require("../../store");
const dccActionNamespace = require("../../namespaces/dcc/action");
const logger = require("../../utils/logger");

/**
 * /ui undoLastCommand
 *
 * Undo the last command on a running action
 */
const undoLastCommand = (socket, io) => {
  socket.on("undoLastCommand", (data, callback) => {
    logger.debugReceiveMessage("/ui", "undoLastCommand", `${data.uuid}`);

    if (!data.uuid || !store.instance.data.runningActions[data.uuid]) {
      callback({ status: 400, msg: `Can't undo last command ${data.uuid}` });
      return;
    }

    // Get the dcc client uuid from the action
    const { context_metadata } = store.instance.data.runningActions[data.uuid];
    const clientUuid = context_metadata.uuid;

    // Forward the message to the dcc using its uuid
    logger.debugSendMessage("/dcc/action", "undo", `Sent to dcc: ${data.uuid}`);

    dccActionNamespace(io).to(clientUuid).emit("undo", data);

    callback({
      status: 200,
      msg: "Undo last command successfull",
    });
  });
};

module.exports = undoLastCommand;
