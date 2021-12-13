const store = require("../../store");
const { uiRoomTo } = require("../../rooms/ui");
const logger = require("../../utils/logger");

/**
 * /dcc initialization
 *
 * Event sent by a dcc with it's resolved context.
 * The DCC information is then stored in the store.
 */
const initialization = (socket, io) => {
  socket.on("initialization", (dccContext, callback) => {
    logger.debugReceiveMessage("/dcc", "initialization", dccContext.uuid);

    if (!dccContext.uuid) {
      callback({
        status: 400,
        msg: "The context needs to have an uuid in order to join the room",
      });
      return;
    }

    // Make the socket join a room with its uuid
    socket.join(dccContext.uuid);

    // Add that new client to the store
    store.instance.data.dccs[dccContext.uuid] = dccContext;

    // Store its uuid in the socket data itself (for reuse later)
    socket.data.uuid = dccContext.uuid;

    // Broadcast that event to the UIs
    logger.debugSendMessage("/ui", "dccConnect", dccContext.uuid);
    uiRoomTo(io).emit("dccConnect", {
      data: {
        context: dccContext,
      },
    });

    callback({
      status: 200,
      msg: `dcc ${dccContext.uuid} initialized`,
    });
  });
};

module.exports = initialization;
