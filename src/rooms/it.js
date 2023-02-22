const itNamespace = require("../namespaces/it/it");

/**
 * Make a client join the IT room
 */
const itRoomJoin = (socket) => {
  return socket.join("itRoom");
};

/**
 * Used to send a message to all ITs in the room
 */
const itRoomTo = (io) => {
  return itNamespace(io).to("itRoom");
};

module.exports = { itRoomJoin, itRoomTo };
