const logger = require("../../plugins/logger")
const { spawn } = require("child_process")
const path = require("path")

const launchScene = (socket) => {
  socket.on("launchScene", (data, callback) => {
    logger.info(" => [RECEIVED launchScene on /ui]")

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

    const ls = spawn("rez", args)

    console.log(`Launching: rez ${args.join(" ")}`)

    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`)
    })

    callback({
      status: 200,
      msg: "Ok"
    })

    // const cmd = `rez env silex_client -- silex --task-id ${data.taskId} ${data.dcc}`
  })
}

module.exports = launchScene
