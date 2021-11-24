const express = require("express");
const fs = require("fs");
const path = require("path");
const logRouter = express.Router();

/**
 * GET /log/:file
 *
 * Return the content of a log file
 */
logRouter.get("/:file", (req, res) => {
  try {
    // The log file must be in the log directory
    const logFilePath = path.join(process.env.SILEX_LOG_DIR, req.params.file);

    // Read that file and split by lines
    let data = fs.readFileSync(logFilePath, "utf8").toString().split("\n");

    // The client can give a fromEnd parameter to limit the number of lines
    const { fromEnd } = req.query;

    // If so shrink the result
    if (fromEnd && fromEnd < data.length) {
      data = data.slice(data.length - fromEnd, data.length);
    }

    res.json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = logRouter;
