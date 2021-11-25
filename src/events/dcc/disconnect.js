const store = require("../../store");
const { uiRoomTo } = require("../../rooms/ui");
const logger = require("../../plugins/logger");

/**
 * /dcc disconnect
 *
 * Event fired when a dcc is disconnected
 */
const disconnect = (socket, io) => {
  socket.on("disconnect", () => {
    logger.infoReceiveMessage("/dcc", "disconnect", socket.data.uuid);

    // Get socket connection uuid
    const { uuid } = socket.data;

    // Remove that dcc client from the store
    delete store.instance.data.dccs[uuid];

    // Remove every action that were associated to that dcc client
    for (const [runningUuid, action] of Object.entries(
      store.instance.data.runningActions
    )) {
      if (action.context_metadata.uuid === uuid) {
        delete store.instance.data.runningActions[runningUuid];
      }
    }

    // Forward the event to UI
    logger.infoSendMessage("/ui", "dccDisconnect", socket.data.uuid);
    uiRoomTo(io).emit("dccDisconnect", { data: { uuid: socket.data.uuid } });
  });
};

module.exports = disconnect;
