const path = require("path")
const homedir = require("os").homedir()
// test env
process.env.SILEX_FRONT_URL="http://front.prod.silex.artfx.fr"
process.env.ZOU_API_URL="http://kitsu.prod.silex.artfx.fr"
process.env.PORT=5118
process.env.SILEXDIR=path.join(homedir, "silex")
