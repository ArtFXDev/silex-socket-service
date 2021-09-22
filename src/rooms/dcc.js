const dccRoomJoin = (socket) => {
  return socket.join("dccRoom")
}

const dccRoomTo = (io) => {
  return io.to("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
