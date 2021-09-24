const uiNamespace = require("../namespaces/ui/ui")

const uiRoomJoin = (socket) => {
  return socket.join("uiRoom")
}

const uiRoomTo = (io) => {
  return uiNamespace(io).to("uiRoom")
}

module.exports = { uiRoomJoin, uiRoomTo }
