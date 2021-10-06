const dccNamespace = require("../namespaces/dcc/dcc")

const dccRoomJoin = (socket) => {
  return socket.join("dccRoom")
}

const dccRoomTo = (io) => {
  return dccNamespace(io).to("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
