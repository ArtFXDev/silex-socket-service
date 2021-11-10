const fs = require("fs")
const merge = require("deepmerge")
const logger = require("../plugins/logger")
const store = require("./index")
const path = require("path")
const os = require("os")

const storeFile = path.join(
  process.env.SILEX_LOG_DIR || path.join(os.homedir(), "silex"),
  ".silex_socket_service_store"
)

/**
 * Write the store in json format on the disk
 */
const persistStore = () => {
  const { access_token, refresh_token } = store.instance.data
  try {
    fs.writeFileSync(storeFile, JSON.stringify({ access_token, refresh_token }))
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
