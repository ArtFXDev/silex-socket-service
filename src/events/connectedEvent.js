const event = (socket) => {
    socket.emit("connected", "myData")
}

module.exports = event