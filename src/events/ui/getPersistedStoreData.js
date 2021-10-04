const store = require("../../store")
const fs = require("fs")
const os = require("os")
const dataDir = `${os.homedir()}/${store.storeFolder}`
const fileName = `${store.storeFile}`
const persistStore = (socket) => {
  socket.on("persistStore", (callback) => {
    try {
      console.log("aaa")
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir)
      }
      console.log(`${dataDir}/${fileName}`)
      fs.writeFileSync(`${dataDir}/${fileName}`, JSON.stringify(store))
      if (!callback) {
        return
      }
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
