const logger = require("../../utils/logger");
const zou = require("../../utils/zou");
const fs = require("fs");
const path = require("path");

/**
 * Read a directory recursively
 * returns {path, isDirectory: true, children: [{filePath, isDirectory: false}, ...]}
 */
function readDirRecursive(dir, isDirectory) {
  const result = { path: dir.replace(/\\/g, "/"), isDirectory };

  if (isDirectory) {
    result.children = [];
    const children = fs.readdirSync(dir);

    for (const child of children) {
      const childPath = path.join(dir, child);
      const childStat = fs.statSync(childPath);

      result.children.push(
        readDirRecursive(childPath, childStat.isDirectory())
      );
    }
  }

  return result;
}

/**
 * /ui getPublishedFilesForTask
 *
 * Return the published files structure
 */
const getPublishedFilesForTask = (socket) => {
  socket.on("getPublishedFilesForTask", (request, callback) => {
    logger.infoReceiveMessage("/ui", "getPublishedFilesForTask", request);

    // Get the working file path and replace it with publish
    zou
      .buildWorkingFilePath(request.taskId)
      .then((response) => {
        const publishPath = path.join(
          response.data.path.split("/").slice(0, -1).join("/"),
          "publish"
        );

        logger.info(`Looking for published files in ${publishPath}`);

        if (!fs.existsSync(publishPath)) {
          callback({
            status: 404,
            msg: `The publish directory doesn't exist yet, publish files in order to reference and synchronize them`,
          });
          return;
        }

        const publishStructure = readDirRecursive(publishPath, true);

        callback({
          status: 200,
          data: { path: publishPath, publishStructure },
          msg: "Ok",
        });
      })
      .catch((err) => {
        callback({ status: 500, msg: err.message });
      });
  });
};

module.exports = getPublishedFilesForTask;
