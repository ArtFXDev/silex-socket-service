const initListeners = require("./listeners")
const app = require("express")()
const http = require("http").createServer(app)

const io = require("socket.io")(http)

app.get("/", function (req, res) {
  res.send("<h1> aaaa </h1>")
})

// calls listeners
initListeners(io)

http.listen(3000, function () {
  console.log("listening on *:3000")
})
