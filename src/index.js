// Set environment variables (must be called at first)
require("./plugins/set-env");
const logger = require("./plugins/logger");

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const initListeners = require("./listeners");
const { persistStore, restoreStore } = require("./store/persistence");

// Express HTTP Routes
const authRoutes = require("./routes/auth");
const logRoutes = require("./routes/log");

// Create the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Create the http server
const httpServer = http.createServer(app);

// Initialize socket.io on that server
const io = socketio(httpServer, {
  cors: { origins: [process.env.SILEX_FRONT_URL] },
});

/**
 * Register HTTP routes with a base url
 */
function registerRoutes(baseURL, routes) {
  logger.info(`Registering HTTP ${baseURL} routes`);
  app.use(baseURL, routes);
}

/**
 * Main function, runs the server
 */
const run = async () => {
  // Restore the store if any
  restoreStore();

  // Initialize socketio event listeners
  initListeners(io);

  // Register HTTP routes
  registerRoutes("/auth", authRoutes);
  registerRoutes("/log", logRoutes);

  // Start listening
  httpServer.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}...`);
  });

  // Catch potential errors
  httpServer.on("error", (err) => {
    logger.error(`Server error: ${err}`);
  });
};

// When this module is run directly from the command line
if (require.main === module) {
  run();
}

module.exports = {
  run,
  persistStore,
};
