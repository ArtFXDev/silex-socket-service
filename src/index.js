const initListeners = require("./listeners")
const app = require("express")()
const http = require("http").createServer(app)

const io = require("socket.io")(http, {
  cors: { origins: ["http://localhost:3000"] }
})

const run = async () => {
  app.get("/", function (req, res) {
    res.send("<h1> aaaa </h1>")
  })

  // calls listeners
  initListeners(io)

  http.listen(5118, function () {
    console.log("listening on *:5118")
  })
  console.log("aaa")
}

if (require.main === module) {
  run()
}

module.exports = {
  run
}
