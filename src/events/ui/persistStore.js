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
      fs.writeFileSync(`${dataDir}/${fileName}`, JSON.stringify(store))
      if (!callback || typeof callback !== "function") {
        return
      }

      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } catch (err) {
      console.error(err)
      if (!callback || typeof callback !== "function") {
        return
      }
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500, // ok
        msg: err
      })
    }
  })
}

const restoreStore = (socket) => {
  socket.on("restoreStore", (callback) => {
    try {
      console.log("aaa")
      if (!fs.existsSync(`${dataDir}/${fileName}`)) {
        if (callback && typeof callback === "function") {
          // eslint-disable-next-line node/no-callback-literal
          callback({
            status: 200, // ok
            msg: "Ok but file doesn't exist"
          })
        }
        return
      }
      const rawdata = fs.readFileSync(`${dataDir}/${fileName}`)
      Object.assign(store, JSON.parse(rawdata))
      if (!callback || typeof callback !== "function") {
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

module.exports = { persistStore, restoreStore }
