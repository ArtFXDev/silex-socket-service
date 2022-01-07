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
  socket.on("initialization", (data, callback) => {
    logger.debugReceiveMessage("/dcc", "initialization", data.context.uuid);

    if (!data.context.uuid) {
      callback({
        status: 400,
        msg: "The context needs to have an uuid in order to join the room",
      });
      return;
    }

    // Make the socket join a room with its uuid
    socket.join(data.context.uuid);

    // Add that new client to the store
    store.instance.data.dccs[data.context.uuid] = data.context;

    // Get the running actions
    store.instance.data.runningActions = {
      ...store.instance.data.runningActions,
      ...data.runningActions,
    };

    // Store its uuid in the socket data itself (for reuse later)
    socket.data.uuid = data.context.uuid;

    // Broadcast that event to the UIs
    logger.debugSendMessage("/ui", "dccConnect", data.context.uuid);
    uiRoomTo(io).emit("dccConnect", {
      data: {
        context: data.context,
      },
    });

    callback({
      status: 200,
      msg: `dcc ${data.context.uuid} initialized`,
    });
  });
};

module.exports = initialization;
