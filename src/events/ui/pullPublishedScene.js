const logger = require("../../utils/logger");
const zou = require("../../utils/zou");
const path = require("path");
const fs = require("fs");

/**
 * /ui pullPublishedScene
 *
 * Pull a published file into the work folder
 */
const pullPublishedScene = (socket) => {
  socket.on("pullPublishedScene", (request, callback) => {
    logger.infoReceiveMessage("/ui", "pullPublishedScene", request);

    // Get the working file path from the API
    zou
      .buildWorkingFilePath(request.taskId)
      .then((response) => {
        let workFolderPath = response.data.path;

        if (!fs.existsSync(workFolderPath)) {
          // Recursively create the work folder path if it doesn't exist
          fs.mkdirSync(workFolderPath, { recursive: true });
        }

        const fileName = request.publishedFilePath.split("/").pop();
        const [name, extension] = fileName.split(".");

        const newFileName = name + "_pull" + "." + extension;
        const destination = path.join(workFolderPath, newFileName);

        logger.info(
          `Copying published file ${request.publishedFilePath} to ${destination}`
        );

        // Copy the published file in the work folder
        fs.copyFileSync(request.publishedFilePath, destination);

        callback({
          status: 200,
          msg: "Ok",
          data: {},
        });
      })
      .catch((err) => {
        callback({ status: 500, msg: err.message });
      });
  });
};

module.exports = pullPublishedScene;
