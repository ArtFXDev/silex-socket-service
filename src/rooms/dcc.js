const dccNamespace = require("../namespaces/dcc/dcc");

/**
 * Make a client join the DCC room
 */
const dccRoomJoin = (socket) => {
  return socket.join("dccRoom");
};

/**
 * Used to send a message to all DCCs in the room
 */
const dccRoomTo = (io) => {
  return dccNamespace(io).to("dccRoom");
};

module.exports = { dccRoomJoin, dccRoomTo };
