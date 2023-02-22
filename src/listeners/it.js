// Namespaces
const itNamespace = require("../namespaces/it/it");

// Events
const getEnvs = require("../events/it/getEnvs");

// Rooms
const { itRoomJoin } = require("../rooms/it");

module.exports = function (io) {
  // Register /it listeners
  itNamespace(io).on("connection", function (socket) {
    itRoomJoin(socket);
    getEnvs(socket);
  });
};
