const logger = require("../../plugins/logger")
const { spawn } = require("child_process")

const launchAction = (socket) => {
  socket.on("launchAction", (data) => {
    logger.info(" => [RECEIVED launchAction on /ui]")

    let args = ["env", "silex_client"]

    // Add a dcc if we are launching the action from a dcc
    if (data.dcc) args.push(data.dcc)

    args = args.concat([
      data.projectName.toLowerCase(),
      "--",
      "silex",
      "action",
      data.action,
      "--task-id",
      data.taskId
    ])

    // Spawn a rez env with a silex action
    const action = spawn("rez", args)
    logger.info(`Launching action with: rez ${args.join(" ")}`)

    action.stdout.on("data", (data) => {
      logger.info(`stdout: ${data}`)
    })

    action.stderr.on("data", (data) => {
      logger.error(`stderr: ${data}`)
    })
  })
}

module.exports = launchAction
