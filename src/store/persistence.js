const fs = require("fs")
const os = require("os")
const merge = require("deepmerge")
const logger = require("../plugins/logger")
const store = require("./index")
const path = require("path")

const storeFile = path.join(os.homedir(), ".silex_socket_service")

/**
 * Write the store in json format on the disk
 */
const persistStore = () => {
  try {
    fs.writeFileSync(storeFile, JSON.stringify(store.instance.data))
    logger.info(`Written store to ${storeFile}`)
  } catch (err) {
    logger.error(`Error writing store: ${err}`)
  }
}

/**
 * Reload the store from that file
 */
const restoreStore = () => {
  try {
    const rawdata = fs.readFileSync(storeFile)
    store.instance.data = merge(store.instance.data, JSON.parse(rawdata))
    logger.info(`Loaded store from ${storeFile}`)
  } catch (err) {
    logger.error(`Error when reading back the store: ${err}`)
  }
}

module.exports = { persistStore, restoreStore }
