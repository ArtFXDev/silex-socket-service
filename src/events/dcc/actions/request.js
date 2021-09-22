const store = require("../../../store")

const request = (socket) => {
    console.log(store.dccs)
    socket.on("request", function () {
  })
}

module.exports = request