const store = require("../../store")
const fs = require("fs")
const os = require("os")

const persistStore = (socket) => {
  socket.on("persistStore", (callback) => {
    try {
      const path = `${os.homedir()}/userStore.json`
      console.log(path)
      fs.writeFileSync(path, JSON.stringify(store))
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } catch (err) {
      console.error(err)
    }
  })
}
module.exports = persistStore
