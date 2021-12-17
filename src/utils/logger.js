const pino = require("pino");
const path = require("path");
const fs = require("fs");
const homedir = require("os").homedir();

process.env.SILEX_LOG_DIR = path.join(homedir, "silex");

// Creates the log dir if doesn't exist
// Runs only once because node caches requires
if (!fs.existsSync(process.env.SILEX_LOG_DIR)) {
  fs.mkdirSync(process.env.SILEX_LOG_DIR, { recursive: true });
}

const isInDev = process.env.NODE_ENV === "development";

// The main logger
const logger = pino(
  {
    level: process.env.SILEX_LOG_LEVEL || (isInDev ? "debug" : "info"),
    enabled: process.env.NODE_ENV === "test" ? false : true,
    prettyPrint: {
      colorize: isInDev,
      translateTime: "mm/dd/yyyy - HH:MM:ss",
      ignore: "pid,hostname",
      messageFormat: "[silex-socket-service] {msg}",
    },
  },
  // Only log to a file when in production
  isInDev
    ? undefined
    : path.join(process.env.SILEX_LOG_DIR, ".silex_socket_service_log")
);

/**
 * Logging a message when sending or receiving a network message
 */
logger.debugNetworkMessage = (send, route, message, content) => {
  let str = `${send ? "<-" : "->"} [${route}${message ? " - " + message : ""}]`;
  if (content)
    str = `${str}: ${
      typeof content === "string" ? content : JSON.stringify(content)
    }`;
  logger.debug(str);
};

/**
 * Receiving a message
 */
logger.debugReceiveMessage = (route, message, content) => {
  logger.debugNetworkMessage(false, route, message, content);
};

/**
 * Sending a message
 */
logger.debugSendMessage = (route, message, content) => {
  logger.debugNetworkMessage(true, route, message, content);
};

/**
 * Receiving or sending a HTTP message
 */
logger.debugHTTPMessage = (method, route) => {
  logger.debugNetworkMessage(false, `${method} ${route}`);
};

module.exports = logger;
