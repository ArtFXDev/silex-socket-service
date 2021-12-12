const express = require("express");
const fs = require("fs");
const path = require("path");
const logRouter = express.Router();
const logger = require("../utils/logger");

// List of allowed log files
const ALLOWED_LOG_FILES = [".silex_desktop_log", ".silex_socket_service_log"];

/**
 * GET /log/:file
 *
 * Return the content of a log file
 */
logRouter.get("/:file", (req, res) => {
  if (!ALLOWED_LOG_FILES.includes(req.params.file)) {
    res.status(404).json("The log filename is invalid");
  }

  try {
    // The log file must be in the log directory
    const logFilePath = path.join(process.env.SILEX_LOG_DIR, req.params.file);

    // Read that file and split by lines
    let data = fs.readFileSync(logFilePath).toString().split("\n");
    const totalLines = data.length;

    // Remove last line split
    data.splice(-1);

    // The client can give a fromEnd parameter to limit the number of lines
    const fromEnd = parseInt(req.query.fromEnd);

    // If so shrink the result
    if (fromEnd && fromEnd < data.length) {
      data = data.slice(data.length - fromEnd);
    }

    res.json({ totalLines, lines: data });
  } catch (err) {
    res.status(404).json(err);
  }
});

/**
 * DELETE /log/:file
 *
 * Clears the content of a log file
 */
logRouter.delete("/:file", (req, res) => {
  logger.infoHTTPMessage("DELETE", `/log/${req.params.file}`);

  if (!ALLOWED_LOG_FILES.includes(req.params.file)) {
    res.status(404).json("The log file is invalid, can't delete it");
  }

  try {
    const logFilePath = path.join(process.env.SILEX_LOG_DIR, req.params.file);

    // Clear the content of the file
    fs.writeFileSync(logFilePath, "");

    res.status(200).send();
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = logRouter;
