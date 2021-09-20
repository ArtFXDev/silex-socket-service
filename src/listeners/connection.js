const { connectedEvent } = require("../events")

module.exports = function (io) {
    io.on("connection", function (socket) {
        //connectedEvent(socket)
        socket.emit("connected")
    })
}