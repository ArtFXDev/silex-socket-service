const logger = require("../../utils/logger");
const fg = require("fast-glob");
const fs = require("fs");

/**
 * /ui searchDirRecursive
 *
 * Search for files recursively in a directory
 * Used to display work scenes in the interface
 */
const searchDirRecursive = (socket) => {
  socket.on("searchDirRecursive", (request, callback) => {
    logger.debugReceiveMessage("/ui", "searchDirRecursive", request);

    let folderPath = request.path;

    const extensionsFmt = request.extensions.join(", ");
    logger.debug(
      `Recursively searching files in ${folderPath} with extensions ${extensionsFmt}`
    );

    if (!fs.existsSync(folderPath)) {
      callback({
        status: 404,
        msg: `Folder ${folderPath} doesn't exist`,
      });
      return;
    }

    try {
      const extensionGlob =
        folderPath + "/" + `**/*.(${request.extensions.join("|")})`;

      // Read the files in the folder
      // Only get the useful extensions
      const files = fg.sync(extensionGlob, {
        stats: true,
        ignore: request.ignore,
      });

      // Filter out files
      const filteredFiles = files
        .filter((f) => f.dirent.isFile())
        .map((f) => {
          const { mtime } = f.stats;
          return { name: f.name, path: f.path, mtime };
        });

      callback({
        status: 200,
        msg: "Ok",
        data: { files: filteredFiles },
      });
    } catch (err) {
      callback({ status: 500, msg: JSON.stringify(err) });
    }
  });
};

module.exports = searchDirRecursive;
