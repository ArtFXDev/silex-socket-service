/**
 * Sets an environment variable if not already set
 * @param {*} env the variable name
 * @param {*} value the value to set
 */
function setEnv(env, value) {
  if (typeof process.env[env] === "undefined") {
    process.env[env] = value;
  }
}

// Set environment variables

// Url of the silex-front application
setEnv("SILEX_FRONT_URL", "http://front.prod.silex.artfx.fr");

// Url of the zou API
setEnv("ZOU_API_URL", "http://kitsu.prod.silex.artfx.fr");

// Port of the Socket.IO server
setEnv("PORT", 5118);
