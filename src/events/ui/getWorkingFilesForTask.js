const logger = require("../../plugins/logger")
const zou = require("../../utils/zou")
const fs = require("fs")
const path = require("path")
const os = require("os")

/**
 * /ui getWorkingFilesForTask
 *
 * Used to get the files for a specific task in the pipeline
 */
const getWorkingFilesForTask = (socket) => {
  socket.on("getWorkingFilesForTask", (request, callback) => {
    logger.infoReceiveMessage("/ui", "getWorkingFilesForTask", request)

    // Get the working file path from the API
    zou
      .buildWorkingFilePath(request.taskId)
      .then((response) => {
        let folderPath = response.data.path

        // If we are on UNIX use /home/user/...
        if (["linux", "darwin"].includes(process.platform)) {
          folderPath = path.join(
            os.homedir(),
            folderPath.slice(folderPath.indexOf("/") + 1)
          )
        }

        logger.info(`Looking for working files in ${folderPath}`)

        // Read the files in the folder
        const files = fs.readdirSync(folderPath)

        callback({
          status: 200,
          msg: "Ok",
          data: { path: folderPath, files }
        })
      })
      .catch((err) => callback({ status: 500, msg: err.message }))
  })
}

module.exports = getWorkingFilesForTask
