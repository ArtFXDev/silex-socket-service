const uiRoomJoin = (socket) => {
  return socket.join("uiRoom")
}

const uiRoomTo = (io) => {
  return io.to("uiRoom")
}

module.exports = { uiRoomJoin, uiRoomTo }
