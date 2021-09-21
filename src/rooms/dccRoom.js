const dccRoomJoin = (socket) => {
  console.log("join dcc room")
  return socket.join("dccRoom")
}

const dccRoomTo = (socket) => {
  return socket.To("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
