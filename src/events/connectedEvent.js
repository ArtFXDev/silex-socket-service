const event = (socket, route) => {
    socket.emit(route, "aaa")
}

module.exports = event