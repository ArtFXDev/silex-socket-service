// Namespaces
const frontEventNamespace = require("../namespaces/custom/front-event");
const uiNamespace = require("../namespaces/ui/ui");
const logger = require("../utils/logger");

module.exports = function (io) {
  frontEventNamespace(io).on("connection", (socket) => {
    socket.onAny(function (eventName, data, callback) {
      logger.debugReceiveMessage("/front-event", eventName, data);

      logger.debugSendMessage("/ui", "frontEvent", data);
      uiNamespace(io).emit("frontEvent", data);

      callback({
        status: 200,
      });
    });
  });
};
