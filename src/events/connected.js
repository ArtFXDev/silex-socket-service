const event = (socket) => {
    socket.emit("socker", {socket})
}

module.exports = event