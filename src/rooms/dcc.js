const dccRoomJoin = (socket) => {
  return socket.join("dccRoom")
}

const dccRoomTo = (socket) => {
  return socket.To("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
