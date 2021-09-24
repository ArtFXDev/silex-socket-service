const dccNamespace = require("../namespaces/dcc/dcc")

const dccRoomJoin = (socket) => {
  console.log("join dccRoom")
  return socket.join("dccRoom")
}

const dccRoomTo = (io) => {
  return dccNamespace(io).to("dccRoom")
}

module.exports = { dccRoomJoin, dccRoomTo }
