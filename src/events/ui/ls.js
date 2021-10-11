const fs = require("fs")
const logger = require("../../plugins/logger")
const path = require("path")

const ls = (socket) => {
  socket.on("ls", (data, callback) => {
    logger.info(" => [RECEIVED on /ui ls]")
    try {
      if (!fs.existsSync(`${data}`)) {
        if (callback && typeof callback === "function") {
          callback({
            status: 500, // ok
            msg: "path doesn't exist",
            data: []
          })
        }
        return
      }
      const files = fs.readdirSync(data)
      console.log(files)
      if (!callback || typeof callback !== "function") {
        return
      }
      for (const filesIndex in files) {
        const item = files[filesIndex]
        files[filesIndex] = path.join(data, item)
      }
      console.log(files)
      callback({
        status: 200, // ok
        msg: "Ok",
        data: files
      })
    } catch (err) {
      console.error(err)

      if (!callback || typeof callback !== "function") {
        return
      }
      callback({
        status: 200, // ok
        msg: "Ok",
        data: []
      })
    }
  })
}

module.exports = ls
