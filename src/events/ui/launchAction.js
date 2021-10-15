const logger = require("../../plugins/logger")
const { spawn } = require("child_process")

const launchAction = (socket) => {
  socket.on("launchAction", (data, callback) => {
    logger.info(" => [RECEIVED launchAction on /ui]")

    const args = [
      "env",
      "silex_client",
      "houdini",
      "--",
      "silex",
      "action",
      data.action,
      "--task-id",
      data.taskId
    ]

    const action = spawn("rez", args)
    logger.info(`Launching action with: rez ${args.join(" ")}`)

    action.stdout.on("data", (data) => {
      logger.debug(`stdout: ${data}`)
    })

    action.stderr.on("data", (data) => {
      logger.error(`stderr: ${data}`)
    })
  })
}

module.exports = launchAction
