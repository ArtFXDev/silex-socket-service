const logger = require("../plugins/logger");
const fs = require("fs");
const path = require("path");

module.exports = (io) => {
  // Get the current directory
  const listenersPath = path.resolve(__dirname);

  // Read files in that directory
  const listenerFiles = fs.readdirSync(listenersPath);

  listenerFiles.forEach((listenerFile) => {
    // Prevent from reading the current file
    if (listenerFile !== "index.js") {
      logger.info("Initializing WS message listener in: %s", listenerFile);

      // Requires file
      const listener = require(path.resolve(__dirname, listenerFile));

      // Register listener
      listener(io);
    }
  });
};
