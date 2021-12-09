const logger = require("../../plugins/logger");
const zou = require("../../utils/zou");
const fg = require("fast-glob");
const fs = require("fs");

/**
 * /ui getWorkingFilesForTask
 *
 * Used to get the files for a specific task in the pipeline
 */
const getWorkingFilesForTask = (socket) => {
  socket.on("getWorkingFilesForTask", (request, callback) => {
    logger.infoReceiveMessage("/ui", "getWorkingFilesForTask", request);

    // Get the working file path from the API
    zou
      .buildWorkingFilePath(request.taskId)
      .then((response) => {
        let folderPath = response.data.path;

        logger.info(`Looking recursively for working files in ${folderPath}`);

        if (!fs.existsSync(folderPath)) {
          callback({
            status: 404,
            msg: `The work directory doesn't exist yet, click Software > Open to start a new scene in that context`,
          });
          return;
        }

        // Read the files in the folder
        // Only get the useful extensions
        const files = fg.sync(
          folderPath + "/" + `**/*.(${request.searchExtensions.join("|")})`,
          { stats: true }
        );

        const filteredFiles = files
          .filter((f) => f.dirent.isFile())
          .map((f) => {
            const { mtime } = f.stats;
            return { name: f.name, path: f.path, mtime };
          });

        callback({
          status: 200,
          msg: "Ok",
          data: { path: folderPath, files: filteredFiles },
        });
      })
      .catch((err) => {
        callback({ status: 500, msg: err.message });
      });
  });
};

module.exports = getWorkingFilesForTask;
