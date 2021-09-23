const initListeners = require("./listeners")
const app = require("express")()
const http = require("http").createServer(app)

const io = require("socket.io")(http)

app.get("/", function (req, res) {
  res.send("<h1> aaaa </h1>")
})

// calls listeners
initListeners(io)

if (require.main === module) {
  http.listen(5118, function () {
    console.log("listening on *:5118")
  })
}

export { http }
