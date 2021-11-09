const path = require("path")
const homedir = require("os").homedir()

function setEnv(env, value) {
  if (!process.env[env]) {
    console.log("setting ", env)
    process.env[env] = value
  }
}

// test env
setEnv("SILEX_FRONT_URL", "http://front.prod.silex.artfx.fr")
setEnv("ZOU_API_URL", "http://kitsu.prod.silex.artfx.fr")
setEnv("PORT", 5118)
setEnv("SILEXDIR", path.join(homedir, "silex"))
