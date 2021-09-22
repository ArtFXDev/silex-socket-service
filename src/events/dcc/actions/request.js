const store = require("../../../store")

const request = (socket, io) => {
  console.log(store.dccs)
  socket.on("request", function () {
  })
}

module.exports = request
