const logger = require("../../plugins/logger")
const zou = require("../../utils/zou")
const fs = require("fs")
const path = require("path")
const os = require("os")

const getWorkingFilesForTask = (socket) => {
  socket.on("getWorkingFilesForTask", (data, callback) => {
    logger.info(" => [RECEIVED getWorkingFilesForTask on /ui]")

    zou
      .buildWorkingFilePath(data.taskId)
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
