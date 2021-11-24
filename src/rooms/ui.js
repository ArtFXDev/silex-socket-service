const uiNamespace = require("../namespaces/ui/ui");

/**
 * Make a client join the UI room
 */
const uiRoomJoin = (socket) => {
  return socket.join("uiRoom");
};

/**
 * Used to send a message to all UIs in the room
 */
const uiRoomTo = (io) => {
  return uiNamespace(io).to("uiRoom");
};

module.exports = { uiRoomJoin, uiRoomTo };
