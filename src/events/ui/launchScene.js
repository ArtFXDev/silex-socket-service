const logger = require("../../plugins/logger")
const { spawn } = require("child_process")
const path = require("path")

const launchScene = (socket) => {
  socket.on("launchScene", (data, callback) => {
    logger.info(" => [RECEIVED launchScene on /ui]")

    // ex: rez env silex_houdini -- silex launch --task-id id --dcc houdini
    let args = [
      "env",
      `silex_${data.dcc}`,
      "--",
      "silex",
      "launch",
      "--task-id",
      data.taskId,
      "--dcc",
      data.dcc
    ]

    // If we pass a file
    if (data.scene && data.path) {
      args = args.concat(["--file", path.join(data.path, data.scene)])
    }

    const launch = spawn("rez", args)

    logger.info(`Launching: rez ${args.join(" ")}`)

    launch.stdout.on("data", (data) => {
      logger.debug(`stdout: ${data}`)
    })

    callback({
      status: 200,
      msg: "Ok"
    })
  })
}

module.exports = launchScene
