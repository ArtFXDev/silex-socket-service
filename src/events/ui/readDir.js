const logger = require("../../utils/logger");
const fs = require("fs");
const path = require("path");
const { isJunk } = require("../../utils/junk");

/**
 * /ui readDir
 *
 * Read files and folders inside the given path
 */
const readDir = (socket) => {
  socket.on("readDir", (request, callback) => {
    logger.debugReceiveMessage("/ui", "readDir", request);

    if (!fs.existsSync(request.path)) {
      callback({
        status: 404,
        msg: `Folder ${request.path.split("/").slice(-1)[0]} doesn't exist...`,
      });
    }

    try {
      const children = fs.readdirSync(request.path);

      // Filter hidden and junk files
      const entries = children
        .filter((filename) => request.includeHiddenFiles || !isJunk(filename))
        .map((child) => {
          const childPath = path.join(request.path, child);
          const stat = fs.statSync(childPath);

          return {
            path: childPath.replaceAll("\\", "/"),
            name: child,
            mtime: stat.mtime,
            isDirectory: stat.isDirectory(),
          };
        });

      callback({
        status: 200,
        msg: "Ok",
        data: { entries },
      });
    } catch (err) {
      callback({ status: 500, msg: JSON.stringify(err) });
    }
  });
};

module.exports = readDir;
