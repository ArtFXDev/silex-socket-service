const uiRoomJoin = (socket) => {
  return socket.join("uiRoom")
}

const uiRoomTo = (socket) => {
  return socket.To("uiRoom")
}

module.exports = { uiRoomJoin, uiRoomTo }
