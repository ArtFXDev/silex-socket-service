const path = require("path")
const homedir = require("os").homedir()

/**
 * Sets an environment variable if not already set
 * @param {*} env the variable name
 * @param {*} value the value to set
 */
function setEnv(env, value) {
  if (!process.env[env]) {
    process.env[env] = value
  }
}

// Set environment variables

// Url of the silex-front application
setEnv("SILEX_FRONT_URL", "http://front.prod.silex.artfx.fr")

// Url of the zou API
setEnv("ZOU_API_URL", "http://kitsu.prod.silex.artfx.fr")

// Port of the Socket.IO server
setEnv("PORT", 5118)

// Folder for config and logs
setEnv("SILEX_LOG_DIR", path.join(homedir, "silex"))
