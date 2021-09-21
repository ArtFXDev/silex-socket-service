const event = (socket) => {
  socket.emit("onbackend", "myData")
}

module.exports = event
