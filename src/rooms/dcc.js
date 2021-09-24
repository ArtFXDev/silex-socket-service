const dccRoomJoin = (socket) => {
  console.log("join dccRoom")
  return socket.join("dccRoom")
}

const dccRoomTo = (io) => {
  return io.to("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
