module.exports = function (io) {
    io.on("connection", function (socket) {
        socket.emit("connected", socket)
    })
}