// Set environment variables (must be called at first)
require("./utils/set-env");
const logger = require("./utils/logger");

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const initListeners = require("./listeners");
const store = require("./store");
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
  // Limit the maximum data it can receive
  // See: https://stackoverflow.com/questions/51069316/nodejs-socket-io-disconnects-when-sending-large-json
  maxHttpBufferSize: 1e8,
  // Only allow silex front as a valid origin
  cors: { origins: [process.env.SILEX_FRONT_URL] },
});

/**
 * Register HTTP routes with a base url
 */
function registerRoutes(baseURL, routes) {
  logger.info(`Registering HTTP ${baseURL} routes`);
  app.use(baseURL, routes);
}

function setLogLevel(newLogLevel) {
  logger.level = newLogLevel;
  persistStore();
}

/**
 * Initialize the store and the listeners
 */
function initialize() {
  restoreStore();

  // Initialize socketio event listeners
  initListeners(io);

  // Register HTTP routes
  registerRoutes("/auth", authRoutes);
  registerRoutes("/log", logRoutes);
}

/**
 * Main function, runs the server
 */
function run() {
  // Start listening
  httpServer.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}...`);
  });

  // Catch potential errors
  httpServer.on("error", (err) => {
    logger.error(`Server error: ${err}`);
  });
}

function close() {
  io.close();
  httpServer.close();
}

// When this module is run directly from the command line run it
if (require.main === module) {
  initialize();
  run();
}

module.exports = {
  initialize,
  app,
  run,
  close,
  store,
  persistStore,
  setLogLevel,
};
