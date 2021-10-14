const logger = require("../../plugins/logger")
const { exec } = require("child_process")

const execEvent = (socket) => {
  socket.on("exec", (command, callback) => {
    logger.info(" => [RECEIVED on /ui exec]")

    if (
      (!command || typeof command !== "string") &&
      callback &&
      typeof callback !== "function"
    ) {
      callback({
        status: 500,
        msg: "Invalid type of command params"
      })
      return
    }

    if (!command || typeof command !== "string") {
      return
    }
    // todo get output of command in /emit
    exec(command, (err, stdout, stderr) => {
      if (!callback || typeof callback !== "function") {
        return
      }
      if (err) {
        callback({
          status: 500,
          msg: err
        })
      }
      if (stderr) {
        callback({
          status: 500,
          msg: stderr
        })
      }
      if (stdout) {
        callback({
          status: 200,
          msg: stdout
        })
      }
    })
    logger.info(`[EXEC] ${command}`)
    if (!callback || typeof callback !== "function") {
      return
    }
    callback({
      status: 200,
      msg: "ok"
    })
  })
}

module.exports = execEvent
